import Image from 'next/image';

type QRPaymentBlockProps = {
  qrSrc: string;
  instructionText?: string;
};

const DEFAULT_INSTRUCTION = 'Откройте своё банковское приложение, наведите смартфон на экран и отсканируйте код.'

export function QRPaymentBlock({ qrSrc, instructionText = DEFAULT_INSTRUCTION }: QRPaymentBlockProps) {
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
          {instructionText}
        </p>
      </div>
    </div>
  );
}
