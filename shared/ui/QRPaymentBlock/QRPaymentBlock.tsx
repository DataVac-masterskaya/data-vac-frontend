'use client';

import Image from 'next/image';

type QRPaymentBlockProps = {
  qrSrc: string;
};

export function QRPaymentBlock({ qrSrc }: QRPaymentBlockProps) {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-6">
      <div className="w-[282px] h-[282px] relative shrink-0">
        <Image
          src={qrSrc}
          alt="QR-код для оплаты"
          width={282}
          height={282}
          className="object-contain"
        />
      </div>
      <div className="w-[282px]">
        <p className="text-base text-fg">
          Откройте своё банковское приложение, наведите смартфон на экран и отсканируйте код.
        </p>
      </div>
    </div>
  );
}
