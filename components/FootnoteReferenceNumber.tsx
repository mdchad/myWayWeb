// // @ts-nocheck
import React from 'react'

function FootnoteReferenceNumber({ footnotes, type, children, index = 1 }) {
  const childrenArray = React.Children.toArray(children);
  const originalText = childrenArray[0]?.props?.text || "" ;

  // Sort footnotes by position
  const sortedFootnotes = [...footnotes].sort((a, b) => a.position - b.position);

  // First, gather all positions and create markers
  const positions = sortedFootnotes
    .filter(footnote => type === footnote.type && footnote.hadithIndex === index)
    .map((footnote, i) => ({
      position: footnote.position,
      marker: (
        <span key={i} className={"footnote font-arabicSymbol"} data-footnote-number={footnote.number}>{footnote.ms}</span>
      )
    }));

  // If no positions, return original content
  if (positions.length === 0) {
    return children;
  }

  // Build the final content
  const result = [];
  let lastPosition = 0;

  positions.forEach(({ position, marker }, index) => {
    // Add text segment
    const textSegment = originalText.slice(lastPosition, position);
    if (textSegment) {
      result.push(
        React.cloneElement(childrenArray[0], {
          key: `text-${index}`,
          text: textSegment,
        })
      );
    }

    // Add footnote marker
    result.push(marker);

    // Update last position
    lastPosition = position;
  });

  // Add remaining text
  if (lastPosition < originalText.length) {
    result.push(
      React.cloneElement(childrenArray[0], {
        key: 'text-final',
        text: originalText.slice(lastPosition),
      })
    );
  }

  return result;
}

export default FootnoteReferenceNumber;