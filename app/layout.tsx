import type { Metadata } from "next";
import Script from "next/script";
import { UIKitProvider } from "@/shared/providers/ui-kit-provider";
import { PageLayout } from "@/shared/ui/PageLayout";
import "./globals.css";
import "@datavac/ui-kit/style.css";

export const metadata: Metadata = {
  title: {
    template: "%s | DataVac",
    default: "DataVac — справочник вакцин",
  },
  description:
    "Справочная информация о вакцинах, инфекциях, противопоказаниях и ингредиентах",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="h-full notranslate" translate="no" suppressHydrationWarning>
      <body className="min-h-dvh flex bg-page text-fg [scrollbar-gutter:stable]">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('datavac-theme')||'light';document.documentElement.classList.toggle('dark',t==='dark')})()`,
          }}
        />
        <Script
          id="cloudpayments"
          src="https://checkout.cloudpayments.ru/checkout.js"
          strategy="afterInteractive"
        />
        <UIKitProvider>
          <PageLayout>{children}</PageLayout>
        </UIKitProvider>
      </body>
    </html>
  );
}
