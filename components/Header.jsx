'use client'

import Link from 'next/link'
import { Popover } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";

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
    await router.push(`search?term=${encodeURIComponent(searchTerm)}&page=1`)
  }

  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks />
            </div>
            <form onSubmit={handleSubmit} className="hidden lg:flex space-x-2">
              <input onChange={handleChange} value={searchTerm} className="w-72 text-sm border-gray-300 border rounded-md p-2" placeholder="Search..."/>
              <button className="bg-royal-blue text-white p-2 rounded-md text-sm">Search</button>
            </form>
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 [&:not(:focus-visible)]:focus:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="space-y-4">
                            {/*<MobileNavLink href="#features">*/}
                            {/*  Features*/}
                            {/*</MobileNavLink>*/}
                            <MobileNavLink href="#reviews">
                              Reviews
                            </MobileNavLink>
                            {/*<MobileNavLink href="#pricing">*/}
                            {/*  Pricing*/}
                            {/*</MobileNavLink>*/}
                            <MobileNavLink href="#faqs">FAQs</MobileNavLink>
                          </div>
                          <div className="mt-8 flex flex-col gap-4">
                            {/*<Button href="/login" variant="outline">*/}
                            {/*  Log in*/}
                            {/*</Button>*/}
                            <form onSubmit={handleSubmit} className="flex space-x-2">
                              <input onChange={handleChange} value={searchTerm} className="text-sm border-gray-300 border rounded-md p-2" placeholder="Search..."/>
                              <button className="bg-royal-blue text-white p-2 rounded-md text-sm">Search</button>
                            </form>
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
          </div>
        </Container>
      </nav>
    </header>
  )
}
