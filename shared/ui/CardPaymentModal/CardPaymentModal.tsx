"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";

import { Drawer, Button, Label, Input, Heading } from "@datavac/ui-kit";

interface CardForm {
  cardNumber: string;
  expiry: string;
  cvv: string;
  email: string;
}

type Field = keyof CardForm;
type Errors = Record<Field, string | null>;
type Touched = Record<Field, boolean>;

function fmtCard(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function fmtExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
}

function luhn(num: string) {
  const d = num.replace(/\D/g, "");
  let s = 0;
  let alt = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = parseInt(d[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    s += n;
    alt = !alt;
  }
  return s % 10 === 0;
}

function vCard(v: string) {
  const d = v.replace(/\D/g, "");
  if (!d) return "Введите номер карты";
  if (d.length < 13 || d.length > 19) return "Некорректный номер карты";
  if (!luhn(d)) return "Некорректный номер карты";
  return null;
}

function vExpiry(v: string) {
  const d = v.replace(/\D/g, "");
  if (d.length < 4) return "Введите ММ/ГГ";
  const m = +d.slice(0, 2);
  const y = +d.slice(2, 4);
  if (m < 1 || m > 12) return "Некорректный месяц";
  const now = new Date();
  const cy = now.getFullYear() % 100;
  const cm = now.getMonth() + 1;
  if (y < cy || (y === cy && m < cm)) return "Карта просрочена";
  return null;
}

function vCvv(v: string) {
  return v.replace(/\D/g, "").length < 3 ? "Введите CVV" : null;
}

function vEmail(v: string) {
  if (!v) return "Введите email";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Некорректный email";
}

const validators: Record<Field, (v: string) => string | null> = {
  cardNumber: vCard,
  expiry: vExpiry,
  cvv: vCvv,
  email: vEmail,
};

interface CardPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export function CardPaymentModal({
  isOpen,
  onClose,
  amount,
}: CardPaymentModalProps) {
  const [form, setForm] = useState<CardForm>({
    cardNumber: "",
    expiry: "",
    cvv: "",
    email: "",
  });
  const [errors, setErrors] = useState<Errors>({
    cardNumber: null,
    expiry: null,
    cvv: null,
    email: null,
  });
  const [touched, setTouched] = useState<Touched>({
    cardNumber: false,
    expiry: false,
    cvv: false,
    email: false,
  });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      triggerRef.current?.click();
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  const set = useCallback(
    (field: Field, raw: string) => {
      setForm((p) => ({ ...p, [field]: raw }));
      if (touched[field])
        setErrors((p) => ({ ...p, [field]: validators[field](raw) }));
    },
    [touched],
  );

  const onCardNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      set("cardNumber", fmtCard(e.target.value)),
    [set],
  );
  const onExpiry = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      set("expiry", fmtExpiry(e.target.value)),
    [set],
  );
  const onCvv = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      set("cvv", e.target.value.replace(/\D/g, "").slice(0, 4)),
    [set],
  );
  const onEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => set("email", e.target.value),
    [set],
  );

  const blur = useCallback(
    (f: Field) => {
      setTouched((p) => ({ ...p, [f]: true }));
      setErrors((p) => ({ ...p, [f]: validators[f](form[f]) }));
    },
    [form],
  );

  const isValid = useMemo(
    () =>
      (Object.keys(validators) as Field[]).every(
        (k) => !validators[k](form[k]),
      ),
    [form],
  );

  const validateAll = useCallback(() => {
    const next: Errors = {
      cardNumber: vCard(form.cardNumber),
      expiry: vExpiry(form.expiry),
      cvv: vCvv(form.cvv),
      email: vEmail(form.email),
    };
    setErrors(next);
    setTouched({ cardNumber: true, expiry: true, cvv: true, email: true });
    return !Object.values(next).some(Boolean);
  }, [form]);

  const handlePay = useCallback(() => {
    if (validateAll()) {
      // TODO: интеграция со сторонним платёжным SDK
      console.log("Pay", { ...form, amount });
    }
  }, [validateAll, form, amount]);

  const handleServicePay = useCallback(() => {
    // TODO: интеграция с платёжным сервисом
    console.log("Service pay", { amount });
  }, [amount]);

  const rub = amount.toLocaleString("ru-RU");

  return (
    <Drawer
      trigger={
        <button
          ref={triggerRef}
          type="button"
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
          onClick={onClose}
        />
      }
      title=""
      // {/* // TODO:  в ui-kit заголовок с text-[22px] font-medium leading-tight*/}
    >
      <Heading as="h2" className="text-[22px] font-medium leading-tight">
        Добровольное ежемесячное пожертвование для АНО «Коллективный Иммунитет»
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePay();
        }}
        noValidate
        className="flex flex-col xl:mt-10 md:mt-17 mt-8 gap-6"
      >
        {/* Номер карты */}
        <div>
          <Input
            variant="grey"
            type="text"
            inputMode="numeric"
            placeholder="Номер карты"
            value={form.cardNumber}
            onChange={onCardNumber}
            onBlur={() => blur("cardNumber")}
            autoComplete="cc-number"
          />
          {touched.cardNumber && errors.cardNumber && (
            <Label className="mt-1 pl-2 text-accent">{errors.cardNumber}</Label>
          )}
        </div>

        {/* ММ/ГГ + CVV */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Input
              variant="grey"
              type="text"
              inputMode="numeric"
              placeholder="ММ/ГГ"
              value={form.expiry}
              onChange={onExpiry}
              onBlur={() => blur("expiry")}
              autoComplete="cc-exp"
            />
            {touched.expiry && errors.expiry && (
              <Label className="mt-1 pl-2 text-accent">{errors.expiry}</Label>
            )}
          </div>
          <div>
            <Input
              variant="grey"
              type="text"
              inputMode="numeric"
              placeholder="CVV"
              value={form.cvv}
              onChange={onCvv}
              onBlur={() => blur("cvv")}
              autoComplete="cc-csc"
            />
            {touched.cvv && errors.cvv && (
              <Label className="mt-1 pl-2 text-accent">{errors.cvv}</Label>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <Input
            variant="grey"
            type="email"
            placeholder="Ваш e-mail"
            value={form.email}
            onChange={onEmail}
            onBlur={() => blur("email")}
            autoComplete="email"
          />
          {touched.email && errors.email && (
            <Label className="mt-1 pl-2 text-accent">{errors.email}</Label>
          )}
        </div>

        {/* Кнопка «Оплатить N ₽» */}
        <Button
          type="submit"
          variant="primary"
          disabled={!isValid}
          className="w-full h-14 text-sm font-semibold rounded-full mt-[-5px] mb-5"
        >
          Оплатить {rub}&nbsp;₽
        </Button>
      </form>

      {/* Кнопка платёжного сервиса */}
      <div className="flex justify-center">
        <Button
          type="button"
          variant="dark"
          onClick={handleServicePay}
          className="w-full h-14 text-sm font-semibold bg-[#343330]"
        >
          <span>Оплатить с</span>
          {/* // TODO: иконку с платёжным сервисом */}
        </Button>
      </div>
    </Drawer>
  );
}
