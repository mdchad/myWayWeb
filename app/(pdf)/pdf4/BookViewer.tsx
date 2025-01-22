'use client'

import React, { useLayoutEffect } from "react";
import { Previewer } from "pagedjs";

const BookViewer = () => {
  useLayoutEffect(() => {
    const previewer = new Previewer();
    previewer
      .preview(
        document.querySelector("#pagedjsdocroot").innerHTML,
        ['./pdf.css'],
        document.querySelector("#preview")
      )
      .then((flow) => {
        console.log("preview rendered, total pages", flow.total, { flow });
      });
    return () => {
      document.head
        .querySelectorAll("[data-pagedjs-inserted-styles]")
        .forEach((e) => e.parentNode?.removeChild(e));
    };
  }, []);
  return <div></div>;
};

export default BookViewer;
