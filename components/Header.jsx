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
     <header className="z-50 sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 py-12">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold md:text-base mr-28"
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
                href="/"
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
                Pengenalan
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
                Terma
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Privasi
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
                placeholder="Carian..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
        </div>
      </header>
  )
}
