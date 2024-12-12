// @ts-nocheck

import React from "react";

function FootnoteReferenceNumber({ footnotes, children }) {
  const sortedFootnotes = [...footnotes].sort((a, b) => b.number - a.number);
  const childrenArray = React.Children.toArray(children);

  let contentWithFootnotes = childrenArray;
  sortedFootnotes.forEach((footnote) => {
    const footnoteNumber = footnote.number;
    const footnoteMarker = (
      <sup
        id={`footnote-${footnoteNumber}`}
        className={childrenArray[0].props.font}
        key={`footnote-${footnoteNumber}`}
      >
        <a href="#footnotes">
          {footnoteNumber}
        </a>
      </sup>
    );

    let footnoteInserted = false;

    contentWithFootnotes = contentWithFootnotes.reduce((acc, child) => {
      const childText = child.props?.text || "";

      const beforeFootnote = childText.slice(0, footnote.position);
      const afterFootnote = childText.slice(footnote.position);

      acc.push(
        React.cloneElement(child, {
          key: `before-${footnote.number}`,
          text: beforeFootnote,
        }),
        footnoteMarker,
        React.cloneElement(child, {
          key: `after-${footnote.number}`,
          text: afterFootnote,
        }),
      );
      footnoteInserted = true;

      return acc;
    }, []);
  });

  return <>{contentWithFootnotes}</>;
}

export default FootnoteReferenceNumber;
