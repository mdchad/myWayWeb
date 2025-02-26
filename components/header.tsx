'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, Moon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {Logomark} from "@/components/Logo";
import Link from "next/link";

const Navbar = ({ children }: any) => {
  const NavLinks = () => (
    <>
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
    </>
  );

  return (
    <nav className="w-full bg-white border-b">
      {/* Mobile Navigation */}
      <div className="lg:hidden w-full px-4 py-3">
        <div className="flex items-center justify-between">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-4">
                <div className="flex flex-col space-y-4">
                  <NavLinks />
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          <div className="flex-1 mx-4">
            {children}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Moon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold lg:text-base mr-28"
                >
                  <Logomark />
                  <div>
                    <p className="ml-2 font-bold text-xl">My Way</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <NavLinks />
              </div>
            </div>

            {/* Right Side - Sign In & Get Started */}
            <div className="hidden lg:block">
              {children}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;