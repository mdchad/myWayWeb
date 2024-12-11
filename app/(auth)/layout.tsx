import { headers } from "next/headers";
import "../globals.css";
import {inter} from "../font";

export default async function RootLayout({ children }) {
  const headersList = await headers();

  const fullPath =
   headersList.get("referrer") || "";

  // Extract the last segment of the path
  const pathSegments = fullPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  // Check if the last segment is 'pdf'
  const isPdfRoute = lastSegment === "pdf";

  // if (isPdfRoute) {
  //   return (
  //     <html
  //       lang="en"
  //       className={`${inter.variable} ${arabicFont.variable} ${arabicSymbolFont.variable} ${hafs.variable} ${surahFont.variable}`}
  //       content="text/html; charset=utf-8"
  //     >
  //       <body>
  //         {children}
  //       </body>
  //     </html>
  //   );
  // } else {
    return (
      <html
        lang="en"
        className={`${inter.variable}`}
        content="text/html; charset=utf-8"
      >
        <body>
          <div className="flex min-h-screen w-full flex-col">
            {children}
          </div>
        </body>
      </html>
    );
  // }
}
