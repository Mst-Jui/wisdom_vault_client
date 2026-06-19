"use client";
import Button from "@/components/reusable/Button";
import { authClient } from "@/lib/auth-client";
import {
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    setIsLoading(true);
    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });
    setIsLoading(false);

    if (error) {
      toast.error(error.message ?? "Failed to sign in");
      return;
    }

    toast.success("Successfully signed in");
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center rounded-3xl bg-surface p-6 max-w-2xl mx-auto border mt-5">
      <Surface className="w-full">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend>Sign In</Fieldset.Legend>
            <Description>Welcome back, log in to your account</Description>
            <Fieldset.Group>
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" variant="secondary" />
                <FieldError />
              </TextField>
              <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input placeholder="Password" variant="secondary" />
                <FieldError />
              </TextField>
            </Fieldset.Group>
            <Button type="submit" className="w-full" isDisabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <div>
              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="h-px flex-1 bg-gray-700/40"></div>
                <span className="text-xs text-gray-400">Or continue with</span>
                <div className="h-px flex-1 bg-gray-700/40"></div>
              </div>
              {/* Google Button - tomar age kemon chilo shekhane rekhe dilam */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-full border border-gray-700/50 py-3 text-sm font-medium hover:bg-gray-200 transition"
              >
                <FcGoogle />
                Sign in with Google
              </button>
              {/* Login Link */}
              <p className="text-center text-sm text-gray-400 mt-5">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-purple-600 hover:text-purple-800 font-medium transition">
                
                  Sign Up
                </Link>
              </p>
            </div>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}