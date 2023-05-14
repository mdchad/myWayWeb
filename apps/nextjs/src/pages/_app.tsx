import '@/styles/tailwind.css'
import 'focus-visible'
import type { AppType } from 'next/app'
import { ClerkProvider } from '@clerk/nextjs'
import { trpc } from '../utils/trpc'

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  )
}

export default trpc.withTRPC(MyApp)
