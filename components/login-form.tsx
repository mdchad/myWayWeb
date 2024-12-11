"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription, CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from 'next/navigation'
import {cn} from "@/lib/utils";
import {Loader2} from "lucide-react";

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const login = async () => {
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: (ctx) => {
          //show loading
          setLoading(true)
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard
          console.log('success')
          router.push('/')
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>

            <Input
              id="password"
              type="password"
              placeholder="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={login}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>



          {/*<div className={cn(*/}
          {/*  "w-full gap-2 flex items-center",*/}
          {/*  "justify-between flex-col"*/}
          {/*)}>*/}
          {/*  <Button*/}
          {/*    variant="outline"*/}
          {/*    className={cn(*/}
          {/*      "w-full gap-2"*/}
          {/*    )}*/}
          {/*    onClick={async () => {*/}
          {/*      await authClient.signIn.social({*/}
          {/*        provider: "google",*/}
          {/*        callbackURL: "/"*/}
          {/*      });*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <svg*/}
          {/*      xmlns="http://www.w3.org/2000/svg"*/}
          {/*      width="1em"*/}
          {/*      height="1em"*/}
          {/*      viewBox="0 0 24 24"*/}
          {/*    >*/}
          {/*      <path*/}
          {/*        fill="currentColor"*/}
          {/*        d="M11.99 13.9v-3.72h9.36c.14.63.25 1.22.25 2.05c0 5.71-3.83 9.77-9.6 9.77c-5.52 0-10-4.48-10-10S6.48 2 12 2c2.7 0 4.96.99 6.69 2.61l-2.84 2.76c-.72-.68-1.98-1.48-3.85-1.48c-3.31 0-6.01 2.75-6.01 6.12s2.7 6.12 6.01 6.12c3.83 0 5.24-2.65 5.5-4.22h-5.51z"*/}
          {/*      ></path>*/}
          {/*    </svg>*/}
          {/*    Sign in with Google*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Powered by{" "}
            <Link
              href="https://better-auth.com"
              className="underline"
              target="_blank"
            >
              <span className="dark:text-orange-200/90">better-auth.</span>
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
