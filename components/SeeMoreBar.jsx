import {ArrowRight} from "lucide-react";

function SeeMoreBar() {
  return (
    <div className="flex flex-row justify-between items-center bg-royal-blue p-2">
      <div className="flex flex-row items-center">
      </div>
      <div className="flex flex-row items-center space-x-2">
        <p className="text-white text-sm">
          Lihat Lagi
        </p>
        <ArrowRight size={18} color={'white'} />
      </div>
    </div>
  )
}

export default SeeMoreBar