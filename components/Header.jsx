"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/Button";
import { Logomark } from "@/components/Logo";
import { Menu } from "lucide-react";

export function Header({ children }) {

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
          target="_blank"
          rel="noopener noreferrer"
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
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
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
              target="_blank"
              rel="noopener noreferrer"
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
      {children}
    </header>
  );
}
