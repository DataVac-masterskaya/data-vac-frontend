'use client';

import { AlphabetFilter } from '@datavac/ui-kit';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, startTransition } from 'react';

const ruLetters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
const enLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export function VaccineAlphabetFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // читаем состояние напрямую из URL
  const active = searchParams.get('letter') || null;
  const language = (searchParams.get('lang') === 'en' ? 'en' : 'ru') as 'ru' | 'en';

  const handleLetterChange = useCallback((letter: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (letter) {
      params.set('letter', letter);
    } else {
      params.delete('letter');
    }
    params.delete('page');

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [searchParams, router]);

  const handleLanguageChange = useCallback((lang: 'ru' | 'en') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', lang);
    params.delete('letter');
    params.delete('page');

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [searchParams, router]);

  return (
    <AlphabetFilter
      letters={language === 'ru' ? ruLetters : enLetters}
      active={active}
      onChange={handleLetterChange}
      language={language}
      onLanguageChange={handleLanguageChange}
    />
  );
}

