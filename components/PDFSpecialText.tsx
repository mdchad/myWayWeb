// @ts-nocheck

import {symbolArabic} from "@/lib/symbolUtil";

function PDFSpecialText({ text, font = "font-serif" }) {
  const regex = /([\uFD3F].*?[\uFD3E])/; // These are the Unicode points for the Arabic brackets
  const parts = text.split(regex);

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
        <span key={index} className="font-serif">
          {segment}
        </span>
      );
    }
  });

  const result = parts.map((part, index) => {
    if (part.startsWith("\uFD3F") && part.endsWith("\uFD3E")) {
      // Remove the special brackets and apply a different style
      return (
        <span key={index} dir="rtl">
          <span className="font-arabic">{part.slice(0, 1)}</span>
          <span className="font-hafs">{part.slice(1, -1)}</span>
          <span className="font-arabic">{part.slice(-1)}</span>
        </span>
      );
    }
    // Render the rest of the text normally
    return segments
  });

  return result
}

export default PDFSpecialText;
