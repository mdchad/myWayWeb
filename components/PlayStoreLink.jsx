import Link from 'next/link'
import clsx from 'clsx'
import Image from "next/image";

export function PlayStoreLink() {
  return (
    <Link
      href="https://play.google.com/store/apps/details?id=com.mdchad.myWay&pli=1"
      aria-label="Download on the Play Store"
    >
      <Image src="/google-play-badge.png"
             alt="Play store logo"
             width={150}
             height={70}
      />
    </Link>
  )
}
