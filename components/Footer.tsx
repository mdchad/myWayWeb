// @ts-nocheck

"use client";

import { Container } from "@/components/Container";
import { Logomark } from "@/components/Logo";
import { NavLinks } from "@/components/NavLinks";
import { PlayStoreLink } from "./PlayStoreLink";
import { AppStoreLink } from "./AppStoreLink";

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-900">
              <Logomark className="h-10 w-10 flex-none fill-cyan-500" />
              <div className="ml-4">
                <p className="text-base font-semibold">My Way</p>
                <p className="mt-1 text-sm">
                  Learn Hadeeth from trusted sources.
                </p>
              </div>
            </div>
            <nav className="mt-11 flex gap-8">
              <NavLinks />
            </nav>
          </div>
          <div className="flex flex-wrap gap-x-6 items-center">
            <AppStoreLink />
            <PlayStoreLink />
          </div>
        </div>
        <div className="flex flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">
          {/*<form className="flex w-full justify-center md:w-auto">*/}
          {/*  <TextField*/}
          {/*    type="email"*/}
          {/*    aria-label="Email address"*/}
          {/*    placeholder="Email address"*/}
          {/*    autoComplete="email"*/}
          {/*    required*/}
          {/*    className="w-60 min-w-0 shrink"*/}
          {/*  />*/}
          {/*  <Button type="submit" className="ml-4 flex-none bg-[#433E0E]">*/}
          {/*    <span className="hidden lg:inline">Join our newsletter</span>*/}
          {/*    <span className="lg:hidden">Join newsletter</span>*/}
          {/*  </Button>*/}
          {/*</form>*/}
          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
