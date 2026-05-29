"use client";

import { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import { Drawer, Text, ErrorState } from "@datavac/ui-kit";

interface AdministrationImagePanelProps {
  trigger: ReactNode;
  title: string;
  imageSrc: string;
  imageAlt: string;
  caption?: string;
}

export function AdministrationImagePanel({
  trigger,
  title,
  imageSrc,
  imageAlt,
  caption,
}: AdministrationImagePanelProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  return (
    <Drawer trigger={trigger} title={title}>
      <div className="flex flex-col w-full gap-5">
        <div
          className="
            relative
            max-w-[328px]
            aspect-square
            border-[1px]
            border-accent
            overflow-hidden
            flex
            items-center
            justify-center
            md:max-w-[400px]
          "
        >
          {!imageError ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <ErrorState message="Не удалось загрузить данные. Попробуйте позже." />
          )}
        </div>
        {caption && <Text className="">{caption}</Text>}
      </div>
    </Drawer>
  );
}
