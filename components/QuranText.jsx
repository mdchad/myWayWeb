function QuranText({ text }) {
  const regex = /([\uFD3F].*?[\uFD3E])/; // These are the Unicode points for the Arabic brackets
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith('\uFD3F') && part.endsWith('\uFD3E')) {
      // Remove the special brackets and apply a different style
      return (
        <span key={index}>
          <span className="font-arabic">{part.slice(0, 1)}</span>
          <span className="font-hafs">{part.slice(1, -1)}</span>
          <span className="font-arabic">{part.slice(-1)}</span>
        </span>
      )
    }
    // Render the rest of the text normally
    return <span key={index} className="font-arabic">{part}</span>;
  })
}

export default QuranText