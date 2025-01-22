import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/header";

export default async function MainLayout({ children }: any) {
  return (
    <>
      <NextTopLoader />
      <div className="flex min-h-screen w-full flex-col">
        <Suspense fallback={<Navbar />}>
          <Navbar>
            <SearchBar />
          </Navbar>
        </Suspense>
        {children}
        <Footer />
        <Toaster />
      </div>
    </>
  );
}
