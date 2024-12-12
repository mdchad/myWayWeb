// @ts-nocheck

import React from "react";
import {Separator} from "../components/ui/separator";

function FootnoteContainer({ footnotes }) {
  if (!footnotes[0].ms) {
    return null
  }

  return (
    <section id="footnotes">
      {/*<h3 id="footnotes" className="text-xl mt-16 mb-4">*/}
      {/*  Footnotes*/}
      {/*</h3>*/}
      <Separator className="my-4"/>
      <ol>
        {footnotes.map((footnote, index) => (
          <li key={index}>
            {footnote.ms}
            {/*<a*/}
            {/*  className="ml-1 px-1 text-orange-500"*/}
            {/*  href={`#footnote-${footnote.number}`}*/}
            {/*>*/}
            {/*</a>*/}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default FootnoteContainer
