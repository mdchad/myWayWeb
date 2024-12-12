import { LoginForm } from "@/components/login-form"

export default function Login() {
  return (
    <main className="px-4 sm:px-6 lg:px-32 mb-20 py-4 sm:py-6 lg:py-16">
      <div className="flex h-screen w-full h-full items-center justify-center px-4">
        <LoginForm />
      </div>
    </main>
  )
}
