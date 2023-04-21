"use client";
import { NextUIProvider } from "@nextui-org/react";
import { useSSR } from "@nextui-org/react";
import { GlobalContextProvider } from "./globalContext";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { isBrowser } = useSSR();
  return (
    <html lang="en">
      <body>
        {isBrowser && (
          <GlobalContextProvider>
            <NextUIProvider>{children}</NextUIProvider>
          </GlobalContextProvider>
        )}
      </body>
    </html>
  );
}
