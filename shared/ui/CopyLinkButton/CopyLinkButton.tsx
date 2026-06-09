'use client';

import { useState } from 'react';
import { PillActionButton } from '@/shared/ui/PillActionButton';

export function CopyLinkButton() {
  const [feedback, setFeedback] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = window.location.href
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setFeedback(true)
    setTimeout(() => setFeedback(false), 2000)
  }

  return (
    <PillActionButton type="button" onClick={handleCopy} variant={feedback ? 'copied' : 'default'}>
      {feedback ? 'Ссылка скопирована' : 'Скопировать ссылку'}
    </PillActionButton>
  );
}
