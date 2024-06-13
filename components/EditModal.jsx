'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {CheckIcon, FileEditIcon, MinusIcon} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

function HadithItem({ hadith, chapterNumber, value, submittedValue, setSubmittedValue, setValue}) {
  async function valueChanged(hadithId, chapterNumber) {
    let pushedValue = submittedValue.concat([{ [hadithId]: value[chapterNumber] }])
    setSubmittedValue(pushedValue)
  }

  function removeValue(values, index) {
    let newValues = [...values.slice(0, index), ...values.slice(index + 1)];
    setValue(newValues)
  }

  function onChangeValue(e, chapter) {
    let updatedArray = [
      ...value.slice(0, chapter),
      e.target.value,
      ...value.slice(chapter + 1)
    ];
    setValue(updatedArray)
  }

  return (
    <div key={hadith._id} className="grid grid-cols-2 space-y-4 items-center">
      <div>
        <p>{hadith?.chapter_title?.ms.slice(0, 50)}</p>
        <p>{hadith?.chapter_title?.ar.slice(0, 50)}</p>
      </div>
      { value.length > 1 && (
        <div className="flex gap-2">
          <Input defaultValue={value[chapterNumber]} onChange={(e) => onChangeValue(e, chapterNumber)}/>
          {submittedValue[chapterNumber] ? <Button variant={'secondary'} onClick={() => valueChanged(hadith._id, chapterNumber)}><CheckIcon size={12} color={'black'} /></Button> : <Button onClick={() => valueChanged(hadith._id, chapterNumber)}><CheckIcon size={12} color={'white'} /></Button> }
          {submittedValue[chapterNumber] ? <Button variant={'secondary'} onClick={() => removeValue(value, chapterNumber)}><MinusIcon size={12} color={'black'} /></Button> : <Button onClick={() => removeValue(value, chapterNumber)}><MinusIcon size={12} color={'white'} /></Button> }
        </div>
      )}
    </div>
  )
}

function EditModal({ chapterId, hadiths}) {
  const [value, setValue] = useState([])
  const [submittedValue, setSubmittedValue] = useState([])

  function onChangeTransliteration(e) {
    let value = e.target.value.trim()
    let splitValue = value.split('\n')
    setValue(splitValue)
  }

  async function submitForm() {
    try {
      const response = await fetch(`/api/hadiths`, {
        method: 'PATCH',
        body: JSON.stringify(submittedValue)
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
  }

  let chapterNumber = -1
  return (
    <Dialog>
      <DialogTrigger><FileEditIcon size={16} color={'black'}/></DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <div>
            { value.length === 0 && <Textarea onChange={onChangeTransliteration}/> }
            {hadiths.map(hadith => {
              if (chapterId !== hadith.chapter_id) {
                chapterId = hadith.chapter_id
                chapterNumber++
                return (
                  <HadithItem key={`${hadith._id}-${value.length}`} hadith={hadith} chapterNumber={chapterNumber} value={value} setValue={setValue} submittedValue={submittedValue} setSubmittedValue={setSubmittedValue}/>
                )
              }
            })}
          </div>
          <Button onClick={submitForm}>Submit</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EditModal