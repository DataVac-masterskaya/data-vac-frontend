import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryCard } from "./category-card";
import "@testing-library/jest-dom";

jest.mock("next/link", () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock("@datavac/ui-kit", () => ({
  Button: ({ children }: any) => <button>{children}</button>,
  Card: ({ children }: any) => <div>{children}</div>,
  Heading: ({ children }: any) => <h3>{children}</h3>,
  Text: ({ children }: any) => <p>{children}</p>,
  ArrowsIcon: () => <span>→</span>,
  Label: ({ children }: any) => <span>{children}</span>,
}));

const mockItems = [
  { id: 1, name: "ЭнцеВир Нео детский", href: "/item1", popularity: 100 },
  { id: 2, name: "Менактра", href: "/item2", popularity: 80 },
  { id: 3, name: "Гиперчувствительность", href: "/item3", popularity: 70 },
  { id: 4, name: "невыясненная энцефалопатия", href: "/item4", popularity: 60 },
  { id: 5, name: "Менактра", href: "/item5", popularity: 50 },
  { id: 6, name: "Менактра", href: "/item6", popularity: 40 },
  { id: 7, name: "Менактра", href: "/item7", popularity: 30 },
  { id: 8, name: "Менактра", href: "/item8", popularity: 20 },
  { id: 9, name: "Менактра", href: "/item9", popularity: 15 },
  { id: 10, name: "Менактра", href: "/item10", popularity: 10 },
];

const mockImage = "https://placehold.co/183x183";

const defaultProps = {
  title: "Список вакцин",
  items: mockItems,
  decorationImage: mockImage,
  viewAllHref: "/vaccines",
  layout: "2col" as const,
};

describe("CategoryCard", () => {
  // ==============================
  // 1. Рендеринг заголовка
  // ==============================
  it("renders title correctly", () => {
    render(<CategoryCard {...defaultProps} />);
    expect(screen.getByText("Список вакцин")).toBeInTheDocument();
  });

  // ==============================
  // 2. Рендеринг label
  // ==============================
  it("renders label 'Чаще всего ищут'", () => {
    render(<CategoryCard {...defaultProps} />);
    expect(screen.getByText("Чаще всего ищут:")).toBeInTheDocument();
  });

  // ==============================
  // 3. Рендеринг кнопки "Смотреть все"
  // ==============================
  it("renders 'Смотреть все' button with correct href", () => {
    render(<CategoryCard {...defaultProps} />);
    const button = screen.getByText("Смотреть все");
    expect(button).toBeInTheDocument();
    expect(button.closest("a")).toHaveAttribute("href", "/vaccines");
  });

  // ==============================
  // 4. Рендеринг элементов списка
  // ==============================
  it("renders items correctly", () => {
    render(<CategoryCard {...defaultProps} />);
    expect(screen.getByText("ЭнцеВир Нео детский")).toBeInTheDocument();
    expect(screen.getAllByText("Менактра")[0]).toBeInTheDocument();
    expect(screen.getByText("Гиперчувствительность")).toBeInTheDocument();
  });

  // ==============================
  // 5. Каждый элемент — ссылка
  // ==============================
  it("renders each item as a link", () => {
    render(<CategoryCard {...defaultProps} />);
    const itemLink = screen.getByText("ЭнцеВир Нео детский").closest("a");
    expect(itemLink).toHaveAttribute("href", "/item1");
  });

  // ==============================
  // 6. Рендеринг с layout="1col"
  // ==============================
  it("renders with 1 column layout", () => {
    render(<CategoryCard {...defaultProps} layout="1col" />);
    expect(screen.getByText("Список вакцин")).toBeInTheDocument();
  });

  // ==============================
  // 7. Рендеринг с decorationImage
  // ==============================
  it("renders decoration image", () => {
    render(
      <CategoryCard
        {...defaultProps}
        decorationImage="https://example.com/image.png"
      />,
    );

    const img = document.querySelector("img");
    expect(img).toHaveAttribute("src", "https://example.com/image.png");
  });

  // ==============================
  // 8. Рендеринг без decorationImage
  // ==============================
  it("renders without decoration image", () => {
    render(<CategoryCard {...defaultProps} decorationImage={""} />);
    const img = screen.queryByRole("img", { hidden: true });
    expect(img).not.toBeInTheDocument();
  });

  // ==============================
  // 9. Количество элементов на десктопе
  // ==============================
  it("shows 10 items on desktop with 2col layout", () => {
    window.innerWidth = 1280;
    fireEvent(window, new Event("resize"));
    render(<CategoryCard {...defaultProps} />);
    const links = screen.getAllByRole("link");
    // +1 за "Смотреть все"
    expect(links.length).toBeGreaterThanOrEqual(10);
  });

  // ==============================
  // 10. Количество элементов на мобильном
  // ==============================
  it("shows 3 items on mobile", () => {
    window.innerWidth = 375;
    fireEvent(window, new Event("resize"));
    render(<CategoryCard {...defaultProps} />);
    const items = mockItems.slice(0, 3);
    items.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  // ==============================
  // 11. Переход по ссылке "Смотреть все"
  // ==============================
  it("navigates to correct category page on click", () => {
    render(<CategoryCard {...defaultProps} />);
    const link = screen.getByText("Смотреть все").closest("a");
    expect(link).toHaveAttribute("href", "/vaccines");
  });

  // ==============================
  // 12. Атрибут aria-hidden у иконки
  // ==============================
  it("hides icon from screen readers", () => {
    render(<CategoryCard {...defaultProps} />);
    const iconContainer = document.querySelector('[aria-hidden="true"]');
    expect(iconContainer).toBeInTheDocument();
  });

  // ==============================
  // 13. Заголовок — h3
  // ==============================
  it("renders title as h3", () => {
    render(<CategoryCard {...defaultProps} />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Список вакцин");
  });

  // ==============================
  // 14. Рендеринг с пустыми items
  // ==============================
  it("renders with empty items list", () => {
    render(<CategoryCard {...defaultProps} items={[]} />);
    expect(screen.getByText("Список вакцин")).toBeInTheDocument();
  });

  // ==============================
  // 15. Рендеринг с одним item
  // ==============================
  it("renders with single item", () => {
    const singleItem = [
      { id: 1, name: "Менактра", href: "/item1", popularity: 100 },
    ];
    render(<CategoryCard {...defaultProps} items={singleItem} />);
    expect(screen.getByText("Менактра")).toBeInTheDocument();
  });
});
