'use client';

import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { validateEmail } from '@/shared/lib/validateEmail';
import { useCallback, useMemo, useState } from 'react';

export function useDonationAmountPicker() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [otherAmount, setOtherAmount] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isAgreedToPersonalData, setIsAgreedToPersonalData] = useState(false);
  const [isAgreedToOffer, setIsAgreedToOffer] = useState(false);
  
  const debouncedOtherAmount = useDebounce(otherAmount, 500);
  const debouncedEmail = useDebounce(email, 300);
  
  //сумма пожертвования
  const getCurrentAmount = useCallback(() => {
    if (selectedAmount !== null) return selectedAmount;
    if (debouncedOtherAmount && !isNaN(Number(debouncedOtherAmount))) {
      return Number(debouncedOtherAmount);
    }
    return null;
  }, [selectedAmount, debouncedOtherAmount]);

  //проверка данных для передачи
  const validateDonationData = useCallback((): boolean => {
    const amount = getCurrentAmount();
    const hasValidAmount: boolean = amount !== null && amount > 0;
    const hasValidEmail: boolean = isEmailEnabled
      ? (email !== '' && emailError === '')
      : true;
    
    const hasBothCheckboxes: boolean = isAgreedToPersonalData === true && isAgreedToOffer === true;

    return hasValidAmount && hasValidEmail && hasBothCheckboxes;
  }, [getCurrentAmount, isEmailEnabled, email, emailError, isAgreedToPersonalData, isAgreedToOffer]);

  //сбор данных для передачи
  const donationData = useMemo(() => {
    const amount = getCurrentAmount();
    const isValid = validateDonationData();
    
    return {
      amount: amount,
      email: email ? debouncedEmail : '',
      isMonthly: email ? true : false,
      isPersonalDataAgreed: isAgreedToPersonalData,
      isOfferAgreed: isAgreedToOffer,
      isValid: isValid
    };
  }, [getCurrentAmount, validateDonationData, isEmailEnabled, debouncedEmail, isAgreedToPersonalData, isAgreedToOffer]);

  // проверка чтобы был выбран пресет или введенная сумма
  const handlePresetClick = (sum: number) => {
    setSelectedAmount(sum);
    setOtherAmount('');
  };

  // только цифры, 0 не первый, один 0 вначале
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    let cleaned = digitsOnly.replace(/^0+/, '');
    
    if (cleaned === '' && digitsOnly.length > 0) {
      cleaned = '0';
    }
    
    if (cleaned !== '') {
      setSelectedAmount(null);
    }

    setOtherAmount(cleaned);
  };

  // для отображения
  const getDisplayValue = (value: string) => {
    if (!value) return '';
    const formattedNumber = new Intl.NumberFormat('ru-RU').format(Number(value));
    return `${formattedNumber}₽`;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (emailError && isEmailTouched) {
      if (validateEmail(value)) {
        setEmailError('');
      }
    }
  };

  const handleEmailBlur = () => {
    setIsEmailTouched(true);

    if (email && !validateEmail(email)) {
      setEmailError('Неправильный формат ввода');
    } else {
      setEmailError('');
    }
  };

  return {
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
  };
}
