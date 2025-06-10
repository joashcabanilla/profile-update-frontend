"use client";

//hooks
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";

//schemas
import { LoginSchema } from "@/schemas";

//style utils and variants
import { cn } from "@/lib/utils";
import { button } from "@/lib/variants";

//icons
import { CircleX, ShieldUser, EyeClosed, Eye } from "lucide-react";

//components
import { CardWrapper as Card } from "@/components/auth/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { username: "", password: "" }
    });

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="flex h-full items-center justify-center p-4 sm:p-6">
            <Card>
                <h1 className="font-poppins text-center text-lg font-bold">Sign into your account</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(() => {})} className="w-full space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-bold">Username</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    ref={usernameRef}
                                                    placeholder="Username"
                                                    type="text"
                                                    autoComplete="false"
                                                    name="username"
                                                    className="peer h-10 rounded-xl ps-9 pe-9 indent-1 text-base font-normal"
                                                />
                                            </FormControl>
                                            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                                                <ShieldUser size={25} />
                                            </div>
                                            <a
                                                className={cn(
                                                    button({
                                                        variant: "closeIcon"
                                                    }),
                                                    field.value
                                                        ? "cursor-pointer opacity-100"
                                                        : "pointer-events-none opacity-0"
                                                )}
                                                aria-label="clear username"
                                                onClick={() => {
                                                    form.setValue("username", "");
                                                    usernameRef.current?.focus();
                                                }}
                                            >
                                                <CircleX size={20} aria-hidden="true" />
                                            </a>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-bold">Password</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    ref={passwordRef}
                                                    placeholder="Password"
                                                    type={showPassword ? "text" : "password"}
                                                    autoComplete="false"
                                                    name="password"
                                                    className="peer h-10 rounded-xl ps-9 pe-9 indent-1 text-base font-normal"
                                                />
                                            </FormControl>
                                            <div className="text-muted-foreground/80 absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <a
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                const passwordType = passwordRef.current?.type;
                                                                if (passwordType === "password") {
                                                                    setShowPassword(true);
                                                                } else {
                                                                    setShowPassword(false);
                                                                }
                                                            }}
                                                        >
                                                            {showPassword ? <Eye size={25} /> : <EyeClosed size={25} />}
                                                        </a>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{showPassword ? "Hide Password" : "Show Password"}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <a
                                                className={cn(
                                                    button({
                                                        variant: "closeIcon"
                                                    }),
                                                    field.value
                                                        ? "cursor-pointer opacity-100"
                                                        : "pointer-events-none opacity-0"
                                                )}
                                                aria-label="clear password"
                                                onClick={() => {
                                                    form.setValue("password", "");
                                                    passwordRef.current?.focus();
                                                }}
                                            >
                                                <CircleX size={20} aria-hidden="true" />
                                            </a>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="float-right cursor-pointer text-base font-bold" size="lg">
                            Sign In
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    );
};
