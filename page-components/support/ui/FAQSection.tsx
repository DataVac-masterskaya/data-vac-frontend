"use client";

import { Accordion, AccordionItem, cn } from "@datavac/ui-kit";

type FAQItem = {
  id: string;
  title: string;
  value: string;
};

type FAQSectionProps = {
  items?: FAQItem[];
  className?: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "1",
    title: "Почему вы не получаете гранты и просите жертвовать физических лиц?",
    value:
      "Мы работаем над всеми видами фандрейзинга, в том числе над грантами, однако гранты от государства и коммерческих компаний не обеспечивают рутинную административную работу НКО — их можно потратить только на один конкретный проект НКО. Увы, но общие расходы НКО, не связанные с конкретными проектами, можно обеспечить только пожертвованиями физических лиц.",
  },
  {
    id: "2",
    title: "У меня нет денег / я не готов(а) помогать деньгами, но я хочу вам помочь как-то иначе. Что я могу сделать??",
    value:
      "Для более чем сотни вакцин мы обработали четыре ключевых параметра: инфекции, возраст, противопоказания и способы введения. Но мы хотим сделать приложение еще удобнее и насыщеннее — для этого нам нужно обработать другие разделы инструкций, а также изменить дизайн и механизм приложения.",
  },
];

export const FAQSection = ({ items, className }: FAQSectionProps) => {
  const faqItems = items ?? FAQ_ITEMS;

  return (
    <Accordion className={cn("my-12 2xl:my-16 max-w-147 mx-auto", className)}
    >
      {faqItems.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          value={item.id}
          // className={cn("cursor-pointer rounded-input p-4 md:p-5 bg-card")}
        >
          {item.value}
        </AccordionItem>
      ))}
    </Accordion>
  );
};
