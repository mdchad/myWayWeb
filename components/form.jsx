"use client"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import {Label} from "@/components/ui/label";
import {useEffect, useState} from "react";
import * as React from "react";
import {useToast} from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {CopyCheckIcon} from "lucide-react";

// This can come from your database or API.
const defaultValue = {
  footnotes: [],
  number: "",
  content: [{
    en: "",
    ms: "",
    ar: ""
  }],
  chapter_id: "",
  chapter_name: "",
  chapter_metadata: "",
  chapter_title: {
    en: "",
    ms: "",
    ar: ""
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
    ar: ""
  },
  book_id: "240360e4-50b4-47a9-9506-9850b0e3bfd7",
  book_name: "sahih_muslim",
  book_title: {
    en: "",
    ms: "Sahih Muslim",
    ar: ""
  }
}

const MIN_TEXTAREA_HEIGHT = 32;

const symbol = [
  'ﷻ',
  'ﷺ',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
  '«',
  '»',
]


export function HadithForm({ data }) {
  const { toast } = useToast()

  const [value, setValue] = useState(data ? data : defaultValue)
    console.log(value)

  async function onSubmit(e) {
    e.preventDefault()

    try {
      const response = await fetch(`/api/hadiths/${data._id}`, {
        method: 'PUT',
        body: JSON.stringify(value)
      })

      if (response.ok) {
        console.log('Add successfully');
        // Handle success
      } else {
        console.error('Error with file');
        // Handle error
      }
    } catch (error) {
      console.error('Error file:', error);
      // Handle error
    }
    toast({
      title: "Successfully update!",
      description: (
        <div className="mt-2 w-[340px] bg-slate-950 rounded-md p-4">
          <p className="text-white">Hadith number {value.number}</p>
        </div>
      ),
    })
  }

  const refs = React.useRef(value.content.map(() => [null, null, null]));

  React.useLayoutEffect(() => {
    refs.current.forEach(([arabicRef, malayRef]) => {
      [arabicRef, malayRef].forEach(ref => {
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
      [arabicRef, malayRef].forEach(ref => {
        if (ref) {
          ref.style.height = 'inherit'; // Reset height
          ref.style.height = `${Math.max(ref.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`; // Set height
        }
      });
  }, [value]);

  async function copyToClipboard(value) {
    await navigator.clipboard.writeText(value)
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="font-semibold">Helper</p>
        <p className="text-slate-500 text-xs mb-2">Copy paste the following:</p>
        <div className="flex flex-wrap">
          {symbol.map((s, i) => {
            return (
              <Popover key={i}>
                <PopoverTrigger asChild>
                  <button onClick={() => copyToClipboard(s)} className="bg-gray-100 mb-2 mr-2 pd-2 border rounded-md font-arabicSymbol text-lg">
                    {s}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-fit p-2 flex gap-1">
                  <CopyCheckIcon size={14}/>
                  <p className="text-xs">Copied to clipboard</p>
                </PopoverContent>
              </Popover>
            )
          })}
        </div>

        <p className="font-symbol"></p>
        <form onSubmit={onSubmit} className="space-y-8">
          <div>
            <Label htmlFor="ar">Number</Label>
            <Input value={value.number} type="number" onChange={(e) => setValue({ ...value, number: e.target.value ? parseInt(e.target.value) : "" })}/>
          </div>
          {
            value.content.map((contentItem, index) => (
              <div key={index} className="space-y-8">
                <div>
                  <Label htmlFor="ar">Arabic</Label>
                  <Textarea value={value.content[index].ar}
                            lang="ar"
                            dir="rtl"
                            className="font-arabic"
                            onChange={(e) => {
                              const updatedContent = [...value.content];
                              updatedContent[index].ar = e.target.value;
                              setValue((prevValue) => ({ ...prevValue, content: updatedContent }));
                            }}
                            ref={el => refs.current[index][0] = el} // Assign Arabic ref
                            style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
                  />
                </div>
                <div>
                  <Label htmlFor="ms">Malay</Label>
                  <Textarea value={value.content[index].ms}
                            className="font-arabicSymbol"
                            onChange={(e) => {
                              const updatedContent = [...value.content];
                              updatedContent[index].ms = e.target.value;
                              setValue((prevValue) => ({ ...prevValue, content: updatedContent }));
                            }}
                            ref={el => refs.current[index][1] = el} // Assign Malay ref
                            style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
                  />
                </div>
                <div>
                  <Label htmlFor="ms">English</Label>
                  <Textarea value={value.content[index].en}
                            className="font-arabicSymbol"
                            onChange={(e) => {
                              const updatedContent = [...value.content];
                              updatedContent[index].en = e.target.value;
                              setValue((prevValue) => ({ ...prevValue, content: updatedContent }));
                            }}
                            ref={el => refs.current[index][2] = el} // Assign English ref
                            style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
                  />
                </div>
                {/*<div className="flex justify-end items-center">*/}
                {/*  { index > 0 && <Button onClick={() => removeHadith(index)} size={'sm'} className="bg-red-500 text-white hover:bg-red-700">- Remove hadith</Button> }*/}
                {/*</div>*/}
                {/*<hr className="h-[2px] bg-gray-500"/>*/}
              </div>
            ))}

          {/*<div className="space-y-2">*/}
          {/*  <p className="text-slate-500 text-xs">This add hadith button will add a new set of inputs. This is for duplicate hadith numbers</p>*/}
          {/*  <Button onClick={(e) => addNewHadith(e)} size={'sm'}>+ Add hadith</Button>*/}
          {/*</div>*/}

          {/*setValue({ ...value, volume_id: selectedVol.id, volume_title: { ...value.volume_title, ms: selectedVol.title.ms, ar: selectedVol.title.ar }})*/}
          {/*<Select onValueChange={(selectedVol) => onSelectChange(selectedVol)}>*/}
          {/*  <SelectTrigger className="w-[180px]">*/}
          {/*    <SelectValue placeholder="Volume" />*/}
          {/*  </SelectTrigger>*/}
          {/*  <SelectContent>*/}
          {/*    {volume?.length && volume.map((vol, i) => {*/}
          {/*      return (*/}
          {/*        <SelectItem key={vol.id} value={vol.title.ms}>{vol.title.ms}</SelectItem>*/}
          {/*      )*/}
          {/*    })}*/}
          {/*  </SelectContent>*/}
          {/*</Select>*/}

          {/*<div className="flex items-center space-x-4">*/}
          {/*  <p className="text-xs">Volume not found? Click here to add</p>*/}
          {/*  <Button size={"sm"} variant={"outline"} onClick={(e) => {*/}
          {/*    e.preventDefault()*/}
          {/*    setToggle(true)}}>*/}
          {/*    <p>+</p>*/}
          {/*  </Button>*/}
          {/*</div>*/}

          <div className="space-y-4">
            <Label>Chapter</Label>
            <Input value={value.chapter_title.ms} placeholder="Malay" onChange={(e) => setValue({ ...value, chapter_title: { ...value.chapter_title, ms: e.target.value } }) }/>
            <Input lang="ar" dir="rtl" className="font-arabic" value={value.chapter_title.ar} placeholder="Arabic" onChange={(e) => setValue({ ...value, chapter_title: { ...value.chapter_title, ar: e.target.value } }) }/>
            <Input value={value.chapter_title.en} placeholder="English" onChange={(e) => setValue({ ...value, chapter_title: { ...value.chapter_title, en: e.target.value } }) }/>
            <Input value={value.chapter_transliteration.ms} placeholder="Transliteration" onChange={(e) => setValue({ ...value, chapter_transliteration: { ...value.chapter_transliteration, ms: e.target.value } }) }/>
            <Textarea
              value={value.chapter_metadata.ar}
              className="font-arabic"
              dir="rtl"
              lang="ar"
              placeholder="Metadata Arabic"
              onChange={(e) => setValue({ ...value, chapter_metadata: { ...value.chapter_metadata, ar: e.target.value } }) }
              style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
              ref={el => chapterRefs.current[0] = el}
            />
            <Textarea
              value={value.chapter_metadata.ms}
              className="font-arabicSymbol"
              placeholder="Metadata Malay"
              onChange={(e) => setValue({ ...value, chapter_metadata: { ...value.chapter_metadata, ms: e.target.value } }) }
              style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
              ref={el => chapterRefs.current[1] = el}
            />
            <Textarea
              value={value.chapter_metadata.en}
              className="font-arabicSymbol"
              placeholder="Metadata English"
              onChange={(e) => setValue({ ...value, chapter_metadata: { ...value.chapter_metadata, en: e.target.value } }) }
              style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
              ref={el => chapterRefs.current[2] = el}
            />
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
      <div className="bg-slate-100 rounded-md p-4">
          <div style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem"}} className="my-6 border-x-2 border-royal-blue grid px-4 py-2">
            <div>
              <p className="font-sans font-bold text-sm text-justify text-gray-500">{value?.chapter_title?.ms}</p>
              <p className="font-sans font-normal text-sm text-justify text-gray-500">{value?.chapter_transliteration?.ms}</p>
            </div>
            <p lang="ar" dir="rtl" className="font-bold text-gray-500 text-lg text-justify font-arabic">{value?.chapter_title?.ar}</p>
            <>
              <p lang="ar" dir="rtl" className="text-xl text-justify whitespace-pre-line font-arabic">{value?.chapter_metadata?.ar}</p>
              <p className="text-md text-justify whitespace-pre-line font-arabicSymbol">{value?.chapter_metadata?.ms}</p>
            </>
          </div>
          {
            value.content.map((content, i) => {
              if (!content.ar) {
                return
              }

              return (
                <div key={i} className="bg-white shadow-sm p-8 space-y-2">
                  <div id={value.number} className="space-y-4">
                    <p lang="ar" dir="rtl" className="order-1 lg:order-2 text-xl text-justify whitespace-pre-line font-arabic">{content.ar}</p>
                    <p className="order-2 lg:order-1 text-md text-justify whitespace-pre-line font-arabicSymbol">{content.ms}</p>
                  </div>
                </div>
              )
            })
          }
        {/*{value && <pre>{JSON.stringify(value, null , 2)}</pre> }*/}
        {/*<pre className="mt-2 rounded-md bg-slate-950 p-4">*/}
        {/*  {value && <code className="text-white">{JSON.stringify(value, null, 2)}</code> }*/}
        {/*</pre>*/}
      </div>
    </div>
  )
}