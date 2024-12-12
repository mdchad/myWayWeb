import { headers } from "next/headers";
import "../globals.css";
import { inter } from "../font";

export default async function RootLayout({ children }: any) {
  return (
    <html
      lang="en"
      className={`${inter.variable}`}
      content="text/html; charset=utf-8"
    >
      <body>
        <div className="flex min-h-screen w-full flex-col">{children}</div>
      </body>
    </html>
  );
  // }
}
