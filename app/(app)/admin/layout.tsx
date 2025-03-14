
import {Toaster} from "@/components/ui/toaster";

export default function AdminLayout({ children }: any) {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        {children}
        <Toaster />
      </div>
    </>
  );
}