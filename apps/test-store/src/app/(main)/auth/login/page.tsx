"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@repo/ui/components/card";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Logo } from "@repo/ui/components/logo";
import { SectionWrapper } from "@repo/ui/components/section-wrapper";
import { toast } from "sonner";
import { INCORRECT_EMAIL_OR_PASSWORD } from "@lib/constants";
import { useLoginMutation } from "@lib/store/services/auth";

const FormSchema = z.object({
  username: z.string().min(1, "This is not a valid username.").max(50),
  password: z.string().min(1, "Password is required.").max(50).min(1),
});

export default function LoginPage(): JSX.Element {
  const [signIn, { isLoading }] = useLoginMutation();

  // fix: use isError from useLoginMutation
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "mor_2314",
      password: "83r5^_",
    },
  });

  const onLogin = async (username: string, password: string) => {
    try {
      await signIn({ username, password }).unwrap();
      setIsError(false);
      toast.success("Login successful");
      router.push("/profile");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setIsError(true);
        form.setError("password", { message: INCORRECT_EMAIL_OR_PASSWORD });
        toast.error(INCORRECT_EMAIL_OR_PASSWORD);
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    await onLogin(values.username, values.password);
  };

  return (
    <SectionWrapper className="h-full flex justify-center items-center">
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- TODO: confirm from shadcdn & zod docs */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-96">
            <CardHeader className="flex flex-col items-center gap-4">
              <Logo />
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-1">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={isLoading && !isError}
              >
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </SectionWrapper>
  );
}
