"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {ChevronLeft} from "lucide-react";
import {useRouter} from "next/navigation";
import { useEffect, useRef } from "react";

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const activeChapterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeChapterRef.current) {
      activeChapterRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  let chapter = "";
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        {/*<TeamSwitcher teams={data.teams} />*/}
        {/*<NavMain items={data.navMain} />*/}
        {/*<p><Link href={`/book/${props.data[0].book_id}/${props.data[0].volume_name.ms}`}><ChevronLeft className="inline"/>back</Link></p>*/}
        <p><Link href={`/book/${props.data[0].book_id}/${props.data[0].volume_name.ms}`}><ChevronLeft className="inline"/>back</Link></p>
      </SidebarHeader>
      <SidebarContent>
        {/*<DatePicker />*/}
        <SidebarGroup>
          <SidebarGroupLabel>{props.data[0].volume_title.ms}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {props.data.map((d) => {
                const isActive = d._id === props.hadith;
                if (chapter !== d.chapter_title.ms) {
                  chapter = d.chapter_title.ms;

                  return (
                    <SidebarMenuItem key={d.number}>
                      <SidebarMenuButton
                        asChild
                        className="h-full hover:bg-transparent"
                      >
                        <p>{chapter}</p>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem key={d.number}>
                          <SidebarMenuSubButton
                            asChild
                            className="cursor-pointer data-[active=true]:bg-royal-blue/80 data-[active=true]:text-white"
                            isActive={isActive}
                            ref={isActive ? activeChapterRef : null}
                          >
                            <Link
                              href={`/admin/${d._id}?volume=${d.volume_id}`}
                            >
                              {d.number}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  );
                } else {
                  return (
                    <SidebarMenuItem key={d.number}>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem key={d.number}>
                          <SidebarMenuSubButton
                            asChild
                            className="cursor-pointer data-[active=true]:bg-royal-blue/80 data-[active=true]:text-white"
                            isActive={isActive}
                            ref={isActive ? activeChapterRef : null}
                          >
                            <Link
                              href={`/admin/${d._id}?volume=${d.volume_id}`}
                            >
                              {d.number}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  );
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/*<SidebarSeparator className="mx-0" />*/}
        {/*<Calendars calendars={data.calendars} />*/}
        {/*<NavFavorites favorites={data.favorites} />*/}
        {/*<NavWorkspaces workspaces={data.workspaces} />*/}
        {/*<NavSecondary items={data.navSecondary} className="mt-auto" />*/}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
