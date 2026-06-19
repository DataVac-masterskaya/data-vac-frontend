'use client';

import { useDonationAmountPicker } from "./useDonationAmountPicker"
import { PresetButton } from './PresetButton';
import { CustomAmountInput } from './CustomAmountInput';
import { SubscriptionToggle } from './SubscriptionToggle';
import { EmailField } from './EmailField';
import { Checkbox } from "../Checkbox";
import { useEffect } from "react";

export type DonationAmountPickerItemPresets = {
  sum: number
  popular: boolean
}

export type DonationData = {
  amount: number | null
  email: string
  isMonthly: boolean
  isPersonalDataAgreed: boolean
  isOfferAgreed: boolean
  isValid: boolean
}

export type DonationAmountPickerProps = {
  presets: DonationAmountPickerItemPresets[]
  onDataChange?: (data: DonationData) => void
}

export function DonationAmountPicker({ presets, onDataChange }: DonationAmountPickerProps) {
  const {
    selectedAmount,
    isEmailEnabled,
    setIsEmailEnabled,
    otherAmount,
    isFocused,
    setIsFocused,
    handlePresetClick,
    handleChange,
    getDisplayValue,
    email,
    emailError,
    handleEmailChange,
    handleEmailBlur,
    isAgreedToPersonalData,
    setIsAgreedToPersonalData,
    isAgreedToOffer,
    setIsAgreedToOffer,
    donationData
  } = useDonationAmountPicker();

  useEffect(() => {
    if (onDataChange) {
      onDataChange(donationData);
    }
  }, [donationData, onDataChange]);

  return (
    <div className="flex flex-col gap-y-8 max-w-[588px] min-w-[328px] w-full">
      <div className="bg-card rounded-2xl p-1 w-full">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(142px,1fr))] gap-1 rounded-xl">
          {presets.map((item) => (
            <PresetButton
              key={item.sum}
              sum={item.sum}
              popular={item.popular}
              isSelected={selectedAmount === item.sum}
              onClick={() => handlePresetClick(item.sum)}
            />
          ))}
          <CustomAmountInput
            value={otherAmount}
            displayValue={getDisplayValue(otherAmount)}
            isFocused={isFocused}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-x-3 gap-y-6 min-h-14">
        <SubscriptionToggle
          checked={isEmailEnabled}
          onChange={setIsEmailEnabled}
        />
        {isEmailEnabled && (
          <EmailField
            value={email}
            error={emailError}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
        )}
      </div>
      <div className="flex flex-col gap-y-3 max-[361px]:gap-y-4">
        <Checkbox
          checked={isAgreedToPersonalData}
          onChange={setIsAgreedToPersonalData}
          label={
            <span>
              Я ознакомился/ась и согласен/а на{' '}
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link hover:text-accent focus:outline-none transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                обработку персональных данных
              </a>{/* TODO: заменить на реальный путь */}
            </span>
          }
        />
        <Checkbox
          checked={isAgreedToOffer}
          onChange={setIsAgreedToOffer}
          label={
            <span>
              Я принимаю условия{' '}
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link hover:text-accent focus:outline-none transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                оферты
              </a>{/* TODO: заменить на реальный путь */}
            </span>
          }
        />
      </div>
      <div className="flex flex-col gap-y-3">
        <button
          type="button"
          disabled={!donationData.isValid}
          className="w-full py-4 rounded-full bg-accent text-white font-medium text-base transition-colors hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Оформить пожертвование
        </button>
        {isEmailEnabled && (
          <button
            type="button"
            className="w-full py-3 rounded-full border border-border text-fg text-sm font-medium transition-colors hover:bg-subtle"
          >
            Изменить условия или отменить подписку
          </button>
        )}
      </div>
    </div>
  );
}
