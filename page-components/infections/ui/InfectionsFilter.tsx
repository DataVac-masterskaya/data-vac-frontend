'use client';

import { TagFilter } from '@datavac/ui-kit';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface Category {
  value: string;
  label: string;
}

interface InfectionsFilterProps {
  activeCategory: string;
  categories: Category[];
}

export function InfectionsFilter({ activeCategory, categories }: InfectionsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Маппинг значений для отображения
  const getLabelByValue = (value: string) => {
    const category = categories.find(cat => cat.value === value);
    return category?.label || 'Все';
  };

  // Получаем значение для активной категории (для отображения в TagFilter)
  const activeLabel = getLabelByValue(activeCategory);

  const handleChange = (tag: string | null) => {
    // Создаем копию текущих параметров, чтобы сохранить sort и другие
    const params = new URLSearchParams(searchParams.toString());

    if (!tag || tag === 'Все') {
      params.delete('category');
    } else {
      const category = categories.find(cat => cat.label === tag);
      if (category) {
        params.set('category', category.value);
      }
    }

    router.replace(`${pathname}?${params.toString()}`);
  };
  
  const tags = categories.map(cat => cat.label);

  return (
    <div className="flex gap-2">
      <TagFilter
        tags={tags}
        active={activeLabel === 'Все' ? 'Все' : activeLabel}
        onChange={handleChange}
      />
    </div>
  );
}
