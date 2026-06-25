import { Accordion, AccordionItem, Drawer, cn} from "@datavac/ui-kit";
import { type ReactNode } from "react";

type PrivacyPolicyItems = {
  id: string;
  title: string;
  value: string;
};

type PrivacyPolicyPanelProps = {
  items?: PrivacyPolicyItems[];
  className?: string;
  trigger: ReactNode;
};

const PRIVACY_POLICY_ITEMS: PrivacyPolicyItems[] = [
  {
    id: "1",
    title: "Общие положения",
    value:
      "Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. № 152-ФЗ «О персональных данных» (далее — Закон о персональных данных) и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые АНО по развитию и поддержке вакцинопрофилактики «Коллективный иммунитет» (далее — Оператор). 1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну. 1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://vaccina.info.",
  },
  {
    id: "2",
    title: "Какие данные мы собираем",
    value: "...",
  },
  {
    id: "3",
    title: "Как мы используем данные",
    value:
      "...",
  },  
  {
    id: "4",
    title: "Передача данных третьим лицам",
    value: "...",
  },
  {
    id: "5",
    title: "Ваши права",
    value: "...",
  },
];

export const PrivacyPolicyPanel = ({
  items,
  className,
  trigger,
}: PrivacyPolicyPanelProps) => {
  const privacyPolicyItems = items ?? PRIVACY_POLICY_ITEMS;

  return (
    <Drawer trigger={trigger} title={"Политика конфиденциальности"} className={cn("w-dvw md:max-w-116 md:py-16 md:px-8 py-6 px-4 ", className)}>
      <Accordion className={cn("w-full", className)}
      // defaultValue={[privacyPolicyItems[0]?.id]}
      >
        {privacyPolicyItems.map((item) => (
          <div
            key={item.id}
            className=""
          >
            <AccordionItem
              iconClassName="text-fg"
              title={item.title}
            >
              {item.value}
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </Drawer>
  );
};
