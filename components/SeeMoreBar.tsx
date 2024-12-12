// @ts-nocheck

import { ArrowRight } from "lucide-react";

function SeeMoreBar() {
  return (
    <div className=" bg-royal-blue p-2">
      <div className="flex flex-row justify-between items-center transition-all duration-300 group-hover:-translate-x-2">
        <div className="flex flex-row items-center"></div>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-white text-sm">Lihat Selanjutnya</p>
          <ArrowRight size={18} color={"white"} />
        </div>
      </div>
    </div>
  );
}

export default SeeMoreBar;
