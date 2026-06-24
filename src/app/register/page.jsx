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

const RegisterPage = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());

    const { error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image || undefined,
    });

    setIsLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    toast.success("Registration successful");

    window.location.href = "/";
  };

  const googleSignIn = async() => {
    await authClient.signIn.social({
    provider: "google",
  });
  };

  return (
    <div className="flex justify-center items-center px-4 py-12 min-h-screen bg-background text-foreground transition-colors duration-300">
      <Card className="max-w-md w-full shadow-xl border bg-background/60 backdrop-blur-xl p-8 border-divider/50 rounded-2xl flex flex-col gap-6">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-3 group mb-4">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-[#FF3B30] via-[#9C27B0] to-[#00D2FF] p-[1.5px]">
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-background">
                <FaBus
                  size={15}
                  className="text-foreground transition-transform group-hover:scale-110"
                />
              </div>
            </div>
            <h1 className="font-serif text-xl font-bold tracking-tight text-foreground">
              ticket
              <span className="font-sans font-light text-muted-foreground">
                bari
              </span>
            </h1>
          </Link>
          <h2 className="font-serif text-2xl font-bold text-foreground tracking-tight text-center">
            Create your account
          </h2>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Join us to purchase tickets and track itineraries instantly
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            isRequired
            name="name"
            type="text"
            className="flex flex-col gap-1.5 w-full"
          >
            <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Name
            </Label>
            <Input
              placeholder="Enter your name"
              className="w-full h-11 px-3.5 rounded-xl border border-divider bg-background/50 placeholder-muted-foreground focus:outline-none focus:border-[#9C27B0] transition-all duration-200"
            />
            <FieldError className="text-xs text-danger font-medium mt-0.5" />
          </TextField>

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
            validate={(value) => {
              if (value.length < 6)
                return "Password must be at least 6 characters";
              if (!/[A-Z]/.test(value))
                return "Password must contain at least one uppercase letter";
              if (!/[a-z]/.test(value))
                return "Password must contain at least one lowercase letter";
              if (!/[0-9]/.test(value))
                return "Password must contain at least one number";
              return null;
            }}
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

          <TextField
            name="image"
            type="url"
            className="flex flex-col gap-1.5 w-full"
          >
            <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Profile Image URL
            </Label>
            <Input
              placeholder="https://example.com/avatar.jpg"
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
            {isLoading ? "Creating account..." : "Register"}
          </Button>
        </Form>

        <div className="flex justify-center items-center gap-3 my-1">
          <Separator className="flex-1 bg-divider h-[1px]" />
          <div className="whitespace-nowrap text-xs text-muted-foreground font-medium tracking-wide uppercase">
            Or register with
          </div>
          <Separator className="flex-1 bg-divider h-[1px]" />
        </div>

        <Button
          onClick={googleSignIn}
          className="w-full h-11 bg-transparent hover:bg-default-100 border border-divider text-foreground rounded-xl shadow-sm active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5"
        >
          <BsGoogle className="text-[#FF3B30]" />
          Sign up with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-1">
          Already have an account?{" "}
          <Link href={"/login"}>
            <span className="text-[#9C27B0] font-semibold hover:underline cursor-pointer transition-colors">
              Sign in instead
            </span>
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;
