"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckIcon, FileCogIcon, FileEditIcon, MinusIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";

function EditVolumeModal({ chapterId, hadiths }) {
  const [value, setValue] = useState({
    ar: hadiths ? hadiths[0].volume_title.ar : null,
    ms: hadiths ? hadiths[0].volume_title.ms : null,
  });
  const { toast } = useToast();

  async function submitForm() {
    try {
      const response = await fetch(`/api/volumes/${hadiths[0].volume_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          volume_title: {
            ar: value.ar,
            ms: value.ms,
            en: hadiths[0].volume_title.en,
          },
        }),
      });

      if (response.ok) {
        console.log("Add successfully");
        // Handle success
        toast({
          title: "Successfully update!",
          description: (
            <div className="mt-2 w-[340px] bg-slate-950 rounded-md p-4">
              <p className="text-white">New Volume: {value.ms}</p>
            </div>
          ),
        });
      } else {
        console.error("Error with file");
        // Handle error
      }
    } catch (error) {
      console.error("Error file:", error);
      // Handle error
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <FileCogIcon size={16} color={"black"} />
      </DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <Label>Volume Arabic</Label>
          <Input
            onChange={(e) => setValue({ ...value, ar: e.target.value })}
            className="font-arabic"
            dir="rtl"
            value={value.ar}
          />
          <Label>Volume Malay</Label>
          <Input
            onChange={(e) => setValue({ ...value, ms: e.target.value })}
            value={value.ms}
          />
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={submitForm}>Submit</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditVolumeModal;
