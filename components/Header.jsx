'use client'

import Link from 'next/link'
import { Popover } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import {Logo, Logomark} from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Menu, Package2, Search} from "lucide-react";
import {Input} from "@/components/ui/input";

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronUpIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileNavLink({ children, ...props }) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-gray-700"
      {...props}
    >
      {children}
    </Popover.Button>
  )
}

export function Header() {
  const searchParams = useSearchParams();
  const term = searchParams.get('term')

  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(term ? term : '')

  useEffect(() => {
    setSearchTerm(term ? term : '')
  }, [term])

  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await router.push(`/search?term=${encodeURIComponent(searchTerm)}&page=1`)
  }

  return (
    // <header>
    //   <nav>
    //     <Container className="border-b-royal-blue/50 border-b relative z-50 flex justify-between pt-8 pb-4 mb-4">
    //       <div className="relative z-10 flex items-center gap-16">
    //         <Link href="/" aria-label="Home">
    //           <Logo className="h-10 w-auto" />
    //         </Link>
    //         <div className="hidden lg:flex lg:gap-10">
    //           <NavLinks />
    //         </div>
    //         <form onSubmit={handleSubmit} className="justify-self-end hidden lg:flex space-x-2">
    //           <input onChange={handleChange} value={searchTerm} className="w-72 text-sm border-gray-300 border rounded-md p-2" placeholder="Search..."/>
    //           <button className="bg-royal-blue text-white p-2 rounded-md text-sm">Search</button>
    //         </form>
    //       </div>
    //       <div className="flex items-center gap-6">
    //         <Popover className="lg:hidden">
    //           {({ open }) => (
    //             <>
    //               <Popover.Button
    //                 className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 [&:not(:focus-visible)]:focus:outline-none"
    //                 aria-label="Toggle site navigation"
    //               >
    //                 {({ open }) =>
    //                   open ? (
    //                     <ChevronUpIcon className="h-6 w-6" />
    //                   ) : (
    //                     <MenuIcon className="h-6 w-6" />
    //                   )
    //                 }
    //               </Popover.Button>
    //               <AnimatePresence initial={false}>
    //                 {open && (
    //                   <>
    //                     <Popover.Overlay
    //                       static
    //                       as={motion.div}
    //                       initial={{ opacity: 0 }}
    //                       animate={{ opacity: 1 }}
    //                       exit={{ opacity: 0 }}
    //                       className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
    //                     />
    //                     <Popover.Panel
    //                       static
    //                       as={motion.div}
    //                       initial={{ opacity: 0, y: -32 }}
    //                       animate={{ opacity: 1, y: 0 }}
    //                       exit={{
    //                         opacity: 0,
    //                         y: -32,
    //                         transition: { duration: 0.2 },
    //                       }}
    //                       className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
    //                     >
    //                       <div className="space-y-4">
    //                         {/*<MobileNavLink href="#features">*/}
    //                         {/*  Features*/}
    //                         {/*</MobileNavLink>*/}
    //                         <MobileNavLink href="#reviews">
    //                           Reviews
    //                         </MobileNavLink>
    //                         {/*<MobileNavLink href="#pricing">*/}
    //                         {/*  Pricing*/}
    //                         {/*</MobileNavLink>*/}
    //                         <MobileNavLink href="#faqs">FAQs</MobileNavLink>
    //                       </div>
    //                     </Popover.Panel>
    //                   </>
    //                 )}
    //               </AnimatePresence>
    //             </>
    //           )}
    //         </Popover>
    //       </div>
    //     </Container>
    //     <div className="lg:hidden px-4 py-4 flex flex-col">
    //       <form onSubmit={handleSubmit} className="flex space-x-2">
    //         <input onChange={handleChange} value={searchTerm} className="w-full text-sm border-gray-300 border rounded-md p-2" placeholder="Search..."/>
    //         <button className="bg-royal-blue text-white p-2 rounded-md text-sm">Search</button>
    //       </form>
    //     </div>
    //   </nav>
    // </header>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 py-12">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold md:text-base mr-28"
          >
            {/*<Package2 className="h-6 w-6" />*/}
            {/*<span className="sr-only">Acme Inc</span>*/}
            <Logomark />
            <div>
              <p className="ml-2 font-bold text-xl">My</p>
              <p className="ml-2 font-bold text-xl">Way</p>
            </div>
          </Link>
          <Link
            href="/intro-malay.pdf"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Introduction
          </Link>
          <Link
            href="/hadis40"
            className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
          >
            Hadis 40
          </Link>
          <Link
            href="/terms"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Logomark />
                <div>
                  <p className="ml-2 font-bold text-xl">My</p>
                  <p className="ml-2 font-bold text-xl">Way</p>
                </div>
              </Link>
              <Link
                href="/intro-malay.pdf"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Introduction
              </Link>
              <Link
                href="/hadis40"
                className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
              >
                Hadis 40
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form onSubmit={handleSubmit} className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={handleChange}
                type="search"
                placeholder="Search..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
        </div>
      </header>
  )
}
