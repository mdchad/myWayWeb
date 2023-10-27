import '@/styles/tailwind.css'
import 'focus-visible'
import type { AppType } from 'next/app'
import { trpc } from '../utils/trpc'
import localFont from 'next/font/local'

const myFont = localFont(
  {
    src: [
      {
        path: '../../public/fonts/KFGQPC-Regular.ttf',
        weight: '400'
      },
      {
        path: '../../public/fonts/kfgqpc-arabic-symbols.ttf',
        weight: '400'
      }
    ],
    variable: '--font-KFGQPC'
  }
)

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default trpc.withTRPC(MyApp)
