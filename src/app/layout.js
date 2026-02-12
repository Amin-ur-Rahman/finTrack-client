import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "FINTRACK",
  description:
    "Personal Financial Management & Smart Expense Analytic Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

