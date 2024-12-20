// @ts-nocheck

import { symbolArabic } from "@/lib/symbolUtil";

function SpecialText({ text, font = "font-sans" }) {
  function containsSpecialSymbol(str) {
    return symbolArabic.some((symbol) => str.includes(symbol));
  }

  if (!text) {
    return
  }

  const segments = text.split(/([ ,.!?;:"()]+)/).map((segment, index) => {
    if (containsSpecialSymbol(segment.trim())) {
      // Apply symbol font if segment contains special symbols
      return (
        <span key={index} className="font-arabicSymbol font-normal">
          {segment}
        </span>
      );
    } else {
      // Otherwise, use the default font
      return (
        <span key={index} className={font}>
          {segment}
        </span>
      );
    }
  });

  return <span>{segments}</span>;
}

export default SpecialText;
