'use client'

import {CheckIcon, FileEditIcon} from "lucide-react";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {useToast} from "@/components/ui/use-toast";

const correction = {
  "«": "»",
  "»": "«",
};

function EditBracketButton({ hadith }) {
  const { toast } = useToast()
  const [value, setValue] = useState(hadith)

  async function submitForm(updateValue) {
    console.log(updateValue)
    try {
      const response = await fetch(`/api/hadiths/${updateValue._id}`, {
        method: 'PUT',
        body: JSON.stringify(updateValue)
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
    } finally {
      toast({
        title: "Successfully update!",
        description: (
          <div className="mt-2 w-[340px] bg-slate-950 rounded-md p-4">
            <p className="text-white">Hadith number {value.number}</p>
          </div>
        ),
      })
    }
  }

  async function submitBracketFix(e) {
    e.preventDefault()
    const reg = new RegExp(Object.keys(correction).join("|"), "g");

    const replacedText = value.content.map(cnt => {
      console.log(cnt)
      return {
        ...cnt,
        ar: cnt.ar.replace(reg, (matched) => correction[matched])
      }
    })

    console.log(replacedText)
    // const replacedText = value.content[index].ar.replaceAll("»", "«")
    const updatedContent = [...replacedText];
    // updatedContent[index].ar = replacedText;
    await submitForm({ ...value, content: updatedContent})
    // setValue((prevValue) => ({ ...prevValue, content: updatedContent }));
  }

  return (
    <Button onClick={(e) => submitBracketFix(e)}>
      <CheckIcon size={16} color={'white'} />
    </Button>
  )
}

export default EditBracketButton