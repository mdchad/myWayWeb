// @ts-nocheck

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import * as React from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CopyCheckIcon, MinusIcon, PlusIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { symbolArabic } from "@/lib/symbolUtil";
import QuranText from "@/components/QuranText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// This can come from your database or API.
const defaultValue = {
  footnotes: [],
  number: "",
  content: [
    {
      en: "",
      ms: "",
      ar: "",
    },
  ],
  chapter_id: "",
  chapter_name: "",
  chapter_metadata: "",
  chapter_title: {
    en: "",
    ms: "",
    ar: "",
  },
  chapter_transliteration: {
    en: "",
    ms: "",
  },
  volume_id: "",
  volume_name: "",
  volume_title: {
    en: "",
    ms: "",
    ar: "",
  },
  book_id: "240360e4-50b4-47a9-9506-9850b0e3bfd7",
  book_name: "sahih_muslim",
  book_title: {
    en: "",
    ms: "Sahih Muslim",
    ar: "",
  },
};

const MIN_TEXTAREA_HEIGHT = 32;

const correction = {
  "«": "»",
  "»": "«",
};

const symbolToReplace = {
  "/s": "1",
  "/ra": "48",
  "/rh": "49",
  "/r2": "51",
};

function StickySubmitButton({ submit }) {
  async function copyToClipboard(value) {
    await navigator.clipboard.writeText(value);
  }

  let indexStrings = [1, 42, 48, 49, 50, 51];

  return (
    <div className="fixed flex flex-col items-center bottom-0 left-1/2 transform -translate-x-1/2 m-4">
      <div className="flex flex-wrap">
        {indexStrings.map((s, i) => {
          return (
            <Popover key={i}>
              <PopoverTrigger asChild>
                <button
                  onClick={() => copyToClipboard(symbolArabic[s])}
                  className="hover:bg-gray-200 bg-gray-100 mb-2 mr-2 px-1 border rounded-md font-arabicSymbol text-lg"
                >
                  {symbolArabic[s]}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-fit p-2 flex gap-1">
                <CopyCheckIcon size={14} />
                <p className="text-xs">Copied to clipboard</p>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
      <Button
        onClick={(e) => submit(e)}
        size="lg"
        className="hover:bg-red-400 bg-red-500 text-lg font-arabicSymbol"
      >
        Submit
      </Button>
    </div>
  );
}

export default StickySubmitButton;

export function HadithForm({ data }) {
  // console.log(data)
  const { toast } = useToast();

  const [value, setValue] = useState(data ? data : defaultValue);
  const [caretPosition, setCaretPosition] = useState(0);

  useEffect(() => {
    navigator.clipboard.writeText(caretPosition.toString());
  }, [caretPosition])

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`/api/hadiths/${data._id}`, {
        method: "PUT",
        body: JSON.stringify(value),
      });

      if (response.ok) {
        console.log("Add successfully");
        // Handle success
      } else {
        console.error("Error with file");
        // Handle error
      }
    } catch (error) {
      console.error("Error file:", error);
      // Handle error
    }
    toast({
      title: "Successfully update!",
      description: (
        <div className="mt-2 w-[340px] bg-slate-950 rounded-md p-4">
          <p className="text-white">Hadith number {value.number}</p>
        </div>
      ),
    });
  }

  const refs = React.useRef(value.content.map(() => [null, null, null]));

  React.useLayoutEffect(() => {
    refs.current.forEach(([arabicRef, malayRef]: any) => {
      [arabicRef, malayRef].forEach((ref) => {
        if (ref) {
          ref.style.height = "inherit"; // Reset height
          ref.style.height = `${Math.max(ref.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`; // Set height
        }
      });
    });
  }, [value]);

  const chapterRefs = React.useRef([null, null, null]);

  React.useLayoutEffect(() => {
    const [arabicRef, malayRef] = chapterRefs.current;
    [arabicRef, malayRef].forEach((ref) => {
      if (ref) {
        ref.style.height = "inherit"; // Reset height
        ref.style.height = `${Math.max(ref.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`; // Set height
      }
    });
  }, [value]);

  async function copyToClipboard(value) {
    await navigator.clipboard.writeText(value);
  }

  function replaceBracketText(e, text, index) {
    e.preventDefault();
    const reg = new RegExp(Object.keys(correction).join("|"), "g");
    const replacedText = value.content[index].ar.replace(
      reg,
      (matched) => correction[matched],
    );

    // const replacedText = value.content[index].ar.replaceAll("»", "«")
    const updatedContent = [...value.content];
    updatedContent[index].ar = replacedText;
    setValue((prevValue) => ({ ...prevValue, content: updatedContent }));
  }

  function replaceSymbol(e, text, index) {
    e.preventDefault();
    const reg = new RegExp(Object.keys(symbolToReplace).join("|"), "g");
    const replacedText = value.content[index].ms.replace(
      reg,
      (matched) => symbolArabic[symbolToReplace[matched]],
    );

    // const replacedText = value.content[index].ar.replaceAll("»", "«")
    const updatedContent = [...value.content];
    updatedContent[index].ms = replacedText;
    setValue((prevValue) => ({ ...prevValue, content: updatedContent }));
  }

  function replaceBracketChapterText(e) {
    e.preventDefault();
    const reg = new RegExp(Object.keys(correction).join("|"), "g");
    value.chapter_title.ar = value.chapter_title.ar.replace(
      reg,
      (matched) => correction[matched],
    );

    setValue((prevValue) => ({
      ...prevValue,
      chapter_title: value.chapter_title,
    }));
  }

  function replaceBracketMetadataText(e) {
    e.preventDefault();
    const reg = new RegExp(Object.keys(correction).join("|"), "g");
    value.chapter_metadata.ar = value.chapter_metadata.ar.replace(
      reg,
      (matched) => correction[matched],
    );

    setValue((prevValue) => ({
      ...prevValue,
      chapter_metadata: value.chapter_metadata,
    }));
  }

  function setNewUUID(e) {
    e.preventDefault();
    const newId = uuidv4();
    setValue((prevState) => ({ ...prevState, chapter_id: newId }));
  }

  async function setChapterAsPrevious(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/hadiths?bookName=${data.book_name}&number=${data.number - 1}`,
        {
          method: "GET",
        },
      );

      if (response.ok) {
        console.log("Get successfully");
        const res = await response.json();
        setValue((prevValue) => ({
          ...prevValue,
          chapter_title: res.data.chapter_title,
          chapter_id: res.data.chapter_id,
          chapter_metadata: res.data.chapter_metadata,
          chapter_transliteration: res.data.chapter_transliteration,
        }));
        // Handle success
      } else {
        console.error("Error with file");
        // Handle error
      }
    } catch (error) {
      console.error("Error file:", error);
      // Handle error
    }
    toast({
      title: "Successfully get!",
      description: (
        <div className="mt-2 w-[340px] bg-slate-950 rounded-md p-4">
          <p className="text-white">Get the previous hadith</p>
        </div>
      ),
    });
  }

  function addContent(e) {
    e.preventDefault();
    refs.current = refs.current.concat([[null, null, null]]);
    const newContent = [{ en: "", ms: "", ar: "" }];
    setValue((prevValue) => ({
      ...prevValue,
      content: [...prevValue.content, ...newContent],
    }));
  }

  function removeContent(e) {
    e.preventDefault();
    // console.log(refs.current)
    // refs.current = refs.current.slice(0, -1);
    // console.log(refs.current)
    const newContent = value.content.slice(0, -1);
    console.log(newContent);
    setValue((prevValue) => ({ ...prevValue, content: newContent }));
  }

  function addFootnote(e) {
    e.preventDefault();
    const newFootnote = [{
      number: value?.footnotes[0]?.number ? value.footnotes[0].number + 1 : 0
    }];
    setValue((prevValue) => ({
      ...prevValue,
      footnotes: [...prevValue.footnotes, ...newFootnote],
    }));
  }

  function removeFootnote(e) {
    e.preventDefault();
    const newFootnotes = value.footnotes.slice(0, -1);
    setValue((prevValue) => ({ ...prevValue, footnotes: newFootnotes }));
  }

  return (
    <Tabs defaultValue="form" className="w-full pt-4 p-10">
      <StickySubmitButton submit={onSubmit} />
      <TabsList>
        <TabsTrigger value="form">Form</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="form" className="pt-4">
        <div>
          {/*<p className="font-semibold">Symbols</p>*/}
          {/*<p className="text-slate-500 text-xs mb-2">*/}
          {/*  Copy paste the following:*/}
          {/*</p>*/}
          {/*<div className="flex flex-wrap">*/}
          {/*  {symbolArabic.map((s, i) => {*/}
          {/*    return (*/}
          {/*      <Popover key={i}>*/}
          {/*        <PopoverTrigger asChild>*/}
          {/*          <button*/}
          {/*            onClick={() => copyToClipboard(s)}*/}
          {/*            className="bg-gray-100 mb-2 mr-2 p-1.5 border rounded-md font-arabicSymbol text-lg"*/}
          {/*          >*/}
          {/*            {s}*/}
          {/*          </button>*/}
          {/*        </PopoverTrigger>*/}
          {/*        <PopoverContent className="w-fit p-2 flex gap-1">*/}
          {/*          <CopyCheckIcon size={14} />*/}
          {/*          <p className="text-xs">Copied to clipboard</p>*/}
          {/*        </PopoverContent>*/}
          {/*      </Popover>*/}
          {/*    );*/}
          {/*  })}*/}
          {/*</div>*/}

          <form onSubmit={onSubmit} className="space-y-20">
            <div>
              <Label htmlFor="ar">Number</Label>
              <Input
                value={value.number}
                type="number"
                className="w-fit"
                onChange={(e) =>
                  setValue({
                    ...value,
                    number: e.target.value ? parseFloat(e.target.value) : "",
                  })
                }
              />
            </div>

            <div className="space-y-4 bg-slate-400/10 rounded-lg p-10 shadow-md">
              <Label className="font-bold">Chapter</Label>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Button
                    size="sm"
                    className="p-2 text-xs"
                    onClick={(e) => setNewUUID(e)}
                  >
                    New ID
                  </Button>
                  <Button
                    size="sm"
                    className="p-2 text-xs"
                    onClick={(e) => setChapterAsPrevious(e)}
                  >
                    Same chapter as previous hadith
                  </Button>
                </div>
                <Input
                  className="bg-white"
                  value={value.chapter_id}
                  onChange={(e) =>
                    setValue({ ...value, chapter_id: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4">
                <Button
                  size="sm"
                  className="p-2 text-xs"
                  onClick={(e) => replaceBracketChapterText(e)}
                >
                  Replace
                </Button>
                <Input
                  lang="ar"
                  dir="rtl"
                  className="font-arabic bg-white"
                  value={value.chapter_title.ar}
                  placeholder="Arabic"
                  onChange={(e) =>
                    setValue({
                      ...value,
                      chapter_title: {
                        ...value.chapter_title,
                        ar: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <Input
                value={value.chapter_title.ms}
                className="bg-white"
                placeholder="Malay bg-white"
                onChange={(e) => {
                  setValue({
                    ...value,
                    chapter_title: {
                      ...value.chapter_title,
                      ms: e.target.value,
                    },
                  });
                  setCaretPosition(e.target.selectionStart);
                }}
                onKeyUp={(e) => {
                  setCaretPosition(e.target.selectionStart);
                }}
                onClick={(e) => {
                  setCaretPosition(e.target.selectionStart);
                }}
              />
              <Input
                className="bg-white"
                value={value.chapter_title.en}
                placeholder="English"
                onChange={(e) =>
                  setValue({
                    ...value,
                    chapter_title: {
                      ...value.chapter_title,
                      en: e.target.value,
                    },
                  })
                }
              />
              <Input
                className="bg-white"
                value={value.chapter_transliteration.ms}
                placeholder="Transliteration"
                onChange={(e) =>
                  setValue({
                    ...value,
                    chapter_transliteration: {
                      ...value.chapter_transliteration,
                      ms: e.target.value,
                    },
                  })
                }
              />
              <Button
                size="sm"
                className="p-2 text-xs"
                onClick={(e) => replaceBracketMetadataText(e)}
              >
                Replace
              </Button>
              <Textarea
                value={value.chapter_metadata.ar}
                className="font-arabic"
                dir="rtl"
                lang="ar"
                placeholder="Metadata Arabic"
                onChange={(e) =>
                  setValue({
                    ...value,
                    chapter_metadata: {
                      ...value.chapter_metadata,
                      ar: e.target.value,
                    },
                  })
                }
                style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
                ref={(el) => (chapterRefs.current[0] = el)}
              />
              <Textarea
                value={value.chapter_metadata.ms}
                className="font-arabicSymbol"
                placeholder="Metadata Malay"
                onChange={(e) => {
                  setValue({
                    ...value,
                    chapter_metadata: {
                      ...value.chapter_metadata,
                      ms: e.target.value,
                    },
                  });
                  setCaretPosition(e.target.selectionStart);
                }}
                onKeyUp={(e) => {
                  setCaretPosition(e.target.selectionStart);
                }}
                onClick={(e) => {
                  setCaretPosition(e.target.selectionStart);
                }}
                style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
                ref={(el) => (chapterRefs.current[1] = el)}
              />
              <Textarea
                value={value.chapter_metadata.en}
                className="font-arabicSymbol"
                placeholder="Metadata English"
                onChange={(e) =>
                  setValue({
                    ...value,
                    chapter_metadata: {
                      ...value.chapter_metadata,
                      en: e.target.value,
                    },
                  })
                }
                style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
                ref={(el) => (chapterRefs.current[2] = el)}
              />
            </div>

            <div className="space-y-8 bg-slate-400/10 p-10 shadow-md rounded-t-lg">
              <Label className="font-bold">Matan</Label>
              {value.content.map((contentItem, index) => {
                return (
                  <div className="space-y-4" key={index}>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="ar">{index + 1}. Arabic</Label>
                        <Button
                          size="xs"
                          className="p-2 text-xs"
                          onClick={(e) => replaceBracketText(e, value, index)}
                        >
                          Replace
                        </Button>
                      </div>
                      <Textarea
                        value={value.content[index].ar}
                        lang="ar"
                        dir="rtl"
                        className="font-arabic"
                        onChange={(e) => {
                          const updatedContent = [...value.content];
                          updatedContent[index].ar = e.target.value;
                          setValue((prevValue) => ({
                            ...prevValue,
                            content: updatedContent,
                        }));
                          setCaretPosition(e.target.selectionStart);
                        }}
                        onKeyUp={(e) => {
                          setCaretPosition(e.target.selectionStart);
                        }}
                        onClick={(e) => {
                          setCaretPosition(e.target.selectionStart);
                        }}
                        ref={(el) => (refs.current[index][0] = el)} // Assign Arabic ref
                        style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="ar">Malay</Label>
                        <Button
                          size="sm"
                          className="p-2 text-xs"
                          onClick={(e) => replaceSymbol(e, value, index)}
                        >
                          Replace
                        </Button>
                      </div>
                      <Textarea
                        value={value.content[index].ms}
                        className="font-arabicSymbol"
                        onChange={(e) => {
                          const updatedContent = [...value.content];
                          updatedContent[index].ms = e.target.value;
                          setValue((prevValue) => ({
                            ...prevValue,
                            content: updatedContent,
                          }));
                          setCaretPosition(e.target.selectionStart);
                        }}
                        onKeyUp={(e) => {
                          setCaretPosition(e.target.selectionStart);
                        }}
                        onClick={(e) => {
                          setCaretPosition(e.target.selectionStart);
                        }}
                        ref={(el) => (refs.current[index][1] = el)} // Assign Malay ref
                        style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
                      />
                      <p className="mt-2">Caret position: {caretPosition}</p>
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="ms">English</Label>
                      <Textarea
                        value={value.content[index].en}
                        className="font-arabicSymbol"
                        onChange={(e) => {
                          const updatedContent = [...value.content];
                          updatedContent[index].en = e.target.value;
                          setValue((prevValue) => ({
                            ...prevValue,
                            content: updatedContent,
                          }));
                        }}
                        ref={(el) => (refs.current[index][2] = el)} // Assign English ref
                        style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
                      />
                    </div>
                    {/*<div className="flex justify-end items-center">*/}
                    {/*  { index > 0 && <Button onClick={() => removeHadith(index)} size={'sm'} className="bg-red-500 text-white hover:bg-red-700">- Remove hadith</Button> }*/}
                    {/*</div>*/}
                    <hr className="h-[2px] bg-gray-500" />
                  </div>
                );
              })}
              <Button size="icon" variant="ghost" onClick={addContent}>
                <PlusIcon size={16} color={"black"} />
              </Button>
              <Button size="icon" variant="ghost" onClick={removeContent}>
                <MinusIcon size={16} color={"black"} />
              </Button>
            </div>

            <div className="space-y-4 bg-slate-400/10 rounded-lg p-10 shadow-md">
              <Label className="font-bold">Footnotes</Label>
              {value.footnotes.map((footnote, i) => {
                return (
                  <div className="space-y-2" key={i}>
                    <div className="flex gap-2">
                      <Input
                        className="bg-white"
                        defaultValue={footnote.position || caretPosition}
                        placeholder={"Position"}
                      />
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          const updatedFootnote = [...value.footnotes];
                          updatedFootnote[i].position = caretPosition;
                          setValue((prevValue) => ({
                            ...prevValue,
                            footnotes: updatedFootnote,
                          }));
                        }}
                        disabled={footnote.position}
                      >
                        Add position
                      </Button>
                    </div>
                    <Input
                      value={value.footnotes[i]?.ms || ''}
                      className="bg-white"
                      onChange={(e) => {
                        const updatedFootnote = [...value.footnotes];
                        updatedFootnote[i].ms = e.target.value;
                        setValue((prevValue) => ({
                          ...prevValue,
                          footnotes: updatedFootnote,
                        }));
                      }}
                      placeholder={"Malay"}
                    />
                    <Input
                      value={value.footnotes[i].number}
                      type="number"
                      className="bg-white"
                      onChange={(e) => {
                        const updatedFootnote = [...value.footnotes];
                        updatedFootnote[i].number = parseInt(e.target.value);
                        setValue((prevValue) => ({
                          ...prevValue,
                          footnotes: updatedFootnote,
                        }));
                      }}
                      placeholder={"Number"}
                    />
                    <Input
                      value={value.footnotes[i].hadithIndex}
                      type="number"
                      className="bg-white"
                      onChange={(e) => {
                        const updatedFootnote = [...value.footnotes];
                        updatedFootnote[i].hadithIndex = parseInt(e.target.value);
                        setValue((prevValue) => ({
                          ...prevValue,
                          footnotes: updatedFootnote,
                        }));
                      }}
                      placeholder={"HadithIndex"}
                    />
                    <Select
                      defaultValue={footnote.type}
                      onValueChange={(e) => {
                        const updatedFootnote = [...value.footnotes];
                        updatedFootnote[i].type = e;
                        setValue((prevValue) => ({
                          ...prevValue,
                          footnotes: updatedFootnote,
                        }));
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="content.ms">
                          Content Malay
                        </SelectItem>
                        <SelectItem value="chapter_title.ms">
                          Chapter
                        </SelectItem>
                        <SelectItem value="chapter_metadata.ms">
                          Chapter Metadata
                        </SelectItem>
                        <SelectItem value="volume_title.ms">
                          Volume
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              })}
              <Button variant="ghost" onClick={addFootnote}>
                <PlusIcon size={16} color={"black"} /> More footnote
              </Button>
              <Button variant="ghost" onClick={removeFootnote}>
                <MinusIcon size={16} color={"black"} /> Less footnote
              </Button>
            </div>
            {/*<div className="space-y-4">*/}
            {/*  <Label>Volume</Label>*/}
            {/*  <p className="text-slate-500 text-xs">Volume here will get the previously entered volume. <span className="font-bold text-red-400">Make sure to click the add volume button when adding a new volume</span></p>*/}
            {/*  <Input value={value.volume_title.ms} placeholder="Malay" onChange={(e) => setValue({ ...newVolume, title: { ...newVolume.title, ms: e.target.value }})}/>*/}
            {/*  <Input value={value.volume_title.ar} placeholder="Arabic" onChange={(e) => setNewVolume({ ...newVolume, title: { ...newVolume.title, ar: e.target.value }})}/>*/}
            {/*  <Textarea value={value.metadata} placeholder="Metadata" onChange={(e) => setNewVolume({ ...newVolume, metadata: e.target.value })}/>*/}
            {/*  <Button className="" size={'sm'} variant={'outline'} onClick={submitNewVolume}>Add volume</Button>*/}
            {/*</div>*/}

            <Button type="submit">Submit</Button>
          </form>
        </div>
      </TabsContent>
      <TabsContent value="preview">
        <div className="bg-slate-100 rounded-md p-4">
          <div
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "3rem",
            }}
            className="my-6 border-x-2 border-royal-blue grid px-4 py-2"
          >
            <div>
              <p className="font-sans font-bold text-sm text-justify text-gray-500">
                {value?.chapter_title?.ms}
              </p>
              <p className="font-sans font-normal text-sm text-justify text-gray-500">
                {value?.chapter_transliteration?.ms}
              </p>
            </div>
            <p
              lang="ar"
              dir="rtl"
              className="text-gray-500 text-lg text-justify font-arabic"
            >
              <QuranText
                text={value?.chapter_title?.ar}
                className="font-bold"
              />
            </p>
            <>
              <p
                lang="ar"
                dir="rtl"
                className="text-xl text-justify whitespace-pre-line font-arabic"
              >
                <QuranText text={value?.chapter_metadata?.ar} />
              </p>
              <p className="text-md text-justify whitespace-pre-line font-arabicSymbol">
                <QuranText
                  text={value?.chapter_metadata?.ms}
                  font="font-arabicSymbol"
                />
              </p>
            </>
          </div>
          {value.content.map((content, i) => {
            if (!content.ar) {
              return;
            }

            return (
              <div key={i} className="bg-white shadow-sm p-8 space-y-2">
                <div id={value.number} className="space-y-4">
                  <p
                    lang="ar"
                    dir="rtl"
                    className="order-1 lg:order-2 text-xl text-justify whitespace-pre-line font-arabic"
                  >
                    <QuranText text={content.ar} />
                  </p>
                  <p className="order-2 lg:order-1 text-md text-justify whitespace-pre-line font-arabicSymbol">
                    {content.ms}
                  </p>
                </div>
              </div>
            );
          })}
          {/*{value && <pre>{JSON.stringify(value, null , 2)}</pre> }*/}
          {/*<pre className="mt-2 rounded-md bg-slate-950 p-4">*/}
          {/*  {value && <code className="text-white">{JSON.stringify(value, null, 2)}</code> }*/}
          {/*</pre>*/}
        </div>
      </TabsContent>
    </Tabs>
  );
}
