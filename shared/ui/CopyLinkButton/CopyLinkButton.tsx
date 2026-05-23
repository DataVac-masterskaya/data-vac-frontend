'use client';

import { useState } from 'react';

export function CopyLinkButton() {
  const [feedback, setFeedback] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setFeedback(true);
      setTimeout(() => setFeedback(false), 1500);
    } catch {
      // fallback для старых браузеров
      const textarea = document.createElement('textarea');
      textarea.value = window.location.href;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setFeedback(true);
      setTimeout(() => setFeedback(false), 1500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="h-8 px-3 rounded-full bg-[#F3F3F3] text-[#323335] text-base font-medium transition-colors hover:bg-[#E5E5E5]"
    >
      {feedback ? 'Скопировано!' : 'Скопировать ссылку'}
    </button>
  );
}