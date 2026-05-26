'use client';

import { useState } from 'react';

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
    setTimeout(() => setFeedback(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="h-8 px-3 rounded-full bg-subtle text-fg text-base font-medium transition-colors"
    >
      {feedback ? 'Скопировано!' : 'Скопировать ссылку'}
    </button>
  );
}
