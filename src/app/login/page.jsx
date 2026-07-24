"use client";

import { authClient } from "@/lib/auth-client";
import {
  Alert,
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiCheck } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";
import { FaBus } from "react-icons/fa6";

const LoginPage = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    setIsLoading(false);

    if (data) {
      toast.success("Welcome Back!");
      window.location.href = "/";
    }

    if (error) {
      toast.error(error.message);
    }
  };

  const googleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const loginAsVendor = async () => {
    setIsLoading(true);

    const { data, error } = await authClient.signIn.email({
      email: "vendor@vendor.com",
      password: "Vendor1234",
    });

    setIsLoading(false);

    if (data) {
      toast.success("Logged in as Vendor");
      window.location.href = "/";
    }

    if (error) {
      toast.error(error.message);
    }
  };

  const loginAsAdmin = async () => {
    setIsLoading(true);

    const { data, error } = await authClient.signIn.email({
      email: "admin@admin.com",
      password: "Admin1234",
    });

    setIsLoading(false);

    if (data) {
      toast.success("Logged in as Admin");
      window.location.href = "/";
    }

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-12 min-h-screen bg-background text-foreground transition-colors duration-300">
      <Card className="max-w-md w-full shadow-xl border bg-background/60 backdrop-blur-xl p-8 border-divider/50 rounded-2xl flex flex-col gap-6">
        <div className="flex flex-col items-center mb-4">
          <Link href="/" className="flex items-center gap-3 group mb-4">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-[#FF3B30] via-[#9C27B0] to-[#00D2FF] p-[1.5px]">
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-background">
                <FaBus
                  size={15}
                  className="transition-transform group-hover:scale-110"
                />
              </div>
            </div>
            <h1 className="font-serif text-xl font-bold tracking-tight">
              ticket
              <span className="font-sans font-light text-muted-foreground">
                bari
              </span>
            </h1>
          </Link>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-center">
            Welcome back
          </h2>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Sign in to your account to manage your tickets and bookings
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5 w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Email Address
            </Label>
            <Input
              placeholder="john@example.com"
              className="w-full h-11 px-3.5 rounded-xl border border-divider bg-background/50 placeholder-muted-foreground focus:outline-none focus:border-[#9C27B0] transition-all duration-200"
            />
            <FieldError className="text-xs text-danger font-medium mt-0.5" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            className="flex flex-col gap-1.5 w-full"
          >
            <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Password
            </Label>
            <Input
              placeholder="••••••••"
              className="w-full h-11 px-3.5 rounded-xl border border-divider bg-background/50 placeholder-muted-foreground focus:outline-none focus:border-[#9C27B0] transition-all duration-200"
            />
            <FieldError className="text-xs text-danger font-medium mt-0.5" />
          </TextField>

          {message && (
            <Alert className="bg-danger-50 dark:bg-danger-500/10 text-danger border border-danger-200 dark:border-danger-500/20 text-sm py-2.5 px-3.5 rounded-xl font-medium">
              {message}
            </Alert>
          )}

          <Button
            isDisabled={isLoading}
            className="w-full h-11 text-sm font-semibold text-white bg-linear-to-r from-[#9C27B0] to-[#E91E63] shadow-lg shadow-purple-500/20 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2 mt-2"
            type="submit"
          >
            <BiCheck size={20} />
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </Form>

        <div className="flex justify-center items-center gap-3 my-1">
          <Separator className="flex-1 bg-divider h-[1px]" />
          <div className="whitespace-nowrap text-xs text-muted-foreground font-medium tracking-wide uppercase">
            Or continue with
          </div>
          <Separator className="flex-1 bg-divider h-[1px]" />
        </div>
        <div className="w-full rounded-xl border border-divider bg-muted/30 p-4">
          <p className="mb-3 text-center text-sm font-semibold">
            Demo Credentials
          </p>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              onPress={loginAsVendor}
              isDisabled={isLoading}
              className="rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Demo Vendor
            </Button>

            <Button
              type="button"
              onPress={loginAsAdmin}
              isDisabled={isLoading}
              className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Demo Admin
            </Button>
          </div>
        </div>

        <Button
          onClick={googleSignIn}
          className="w-full h-11 bg-transparent hover:bg-default-100 border border-divider text-foreground rounded-xl shadow-sm active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5"
        >
          <BsGoogle className="text-[#FF3B30]" />
          Sign in with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-1">
          {"Don't"} have an account?{" "}
          <Link href={"/register"}>
            <span className="text-[#9C27B0] font-semibold hover:underline cursor-pointer transition-colors">
              Register here
            </span>
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
