import type { Metadata } from "next";
import { QueryProvider } from "@/shared/providers/query-provider";
import { UIKitProvider } from "@/shared/providers/ui-kit-provider";
import { PageLayout } from "@/shared/ui/PageLayout";
import "./globals.css";
import "@datavac/ui-kit/style.css";

export const metadata: Metadata = {
  title: "DataVac — справочник вакцин",
  description:
    "Справочная информация о вакцинах, инфекциях, противопоказаниях и ингредиентах",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="h-full" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('datavac-theme')||'light';document.documentElement.classList.toggle('dark',t==='dark')})()`,
          }}
        />
      </head>
      <body className="min-h-dvh flex bg-page text-fg">
        <UIKitProvider>
          <QueryProvider>
            <PageLayout>{children}</PageLayout>
          </QueryProvider>
        </UIKitProvider>
      </body>
    </html>
  );
}
