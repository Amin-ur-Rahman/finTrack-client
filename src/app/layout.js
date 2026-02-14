// app/layout.jsx
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Providers from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#000",
              color: "#fff",
              borderRadius: "2px",
              border: "1px solid #333",
              fontSize: "11px",
              fontWeight: "900",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "12px 20px",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10b981",
                secondary: "#000",
              },
              style: {
                borderLeft: "4px solid #94a3b8",
              },
            },
            error: {
              iconTheme: {
                primary: "#f43f5e",
                secondary: "#000",
              },
              style: {
                borderLeft: "4px solid #0f172a",
              },
            },
          }}
        />
      </body>
    </html>
  );
}

