import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    template: "%s | Nomad Tweet",
    default: "Nomad Tweet",
  },
  description: "Connect through your tweets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-neutral-50 text-gray-700 w-full mx-auto max-w-screen-md`}
      >
        {children}
      </body>
    </html>
  );
}
