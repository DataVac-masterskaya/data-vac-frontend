"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  Heading,
  Text,
  ArrowsIcon,
  Label,
} from "@datavac/ui-kit";
import { CategoryCardProps } from "./types";

export function CategoryCard({
  title,
  items,
  decorationImage,
  viewAllHref,
  layout = "1col",
}: CategoryCardProps) {
  const [itemsCount, setItemsCount] = useState(3);
  const showTwoColumnsOnDesktop = layout === "2col";

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768) {
        if (layout === "1col") {
          setItemsCount(5);
        } else {
          setItemsCount(10);
        }
      } else {
        setItemsCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [layout]);

  return (
    <Card
      shadow={true}
      className="
         w-full max-w-[328px] md:max-w-[354px]  xl:max-w-[498px]  2xl:max-w-[646px] 
          flex
          relative
          p-1
          overflow-hidden
        "
    >
      {decorationImage && (
        <img
          src={decorationImage}
          alt=""
          className="
            absolute
            top-[-33px]
            left-[218px]
            z-10
            w-[183px]
            h-[183px]
            2xl:left-[340px]
            object-contain
            z-20
          "
          aria-hidden="true"
        />
      )}
      <div className="flex flex-col h-full min-h-0 w-full">
        <div className="flex justify-between pt-4 px-4 pb-2 2xl:pb-[64px]">
          <div className="flex flex-col gap-[9px] w-[166px] xl:flex-1">
            <Heading
              size="xl"
              as="h3"
              className="font-medium text-fg text-[20px] md:text-[24px] truncate"
            >
              {title}
            </Heading>

            <Label>Чаще всего ищут:</Label>
          </div>
          <Button asChild variant="dark" size="sm" className="z-30 px-3">
            <Link href={viewAllHref}>Смотреть все</Link>
          </Button>
        </div>
        <div
          className="
              flex
              flex-1
              rounded-[12px]
              bg-subtle/70
              backdrop-blur-[14px]
              p-4
              min-h-0
              gap-2
              z-30
              items-start 
            "
        >
          <div
            className={`
                w-full
                grid
                grid-cols-1
                gap-y-2
                2xl:gap-y-4
                ${showTwoColumnsOnDesktop ? "xl:grid-cols-2 xl:gap-x-7" : "xl:grid-cols-1"}
              `}
          >
            {items.slice(0, itemsCount).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex justify-between group w-full"
              >
                <Text
                  size="sm"
                  className="
                      truncate
                      text-fg
                      2xl:!text-base xl:leading-5
                    "
                >
                  {item.name}
                </Text>
                <div
                  className="
                      ml-2
                      w-[20px]
                      h-[20px]
                      flex
                      items-center
                      justify-center
                      rounded-full
                      bg-interactive
                      text-[color:var(--color-fg)]
                      transition-all
                      group-hover:bg-accent
                      group-hover:text-[color:var(--color-interactive)]
                      shrink-0
                    "
                  aria-hidden="true"
                >
                  <ArrowsIcon width={12} height={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
