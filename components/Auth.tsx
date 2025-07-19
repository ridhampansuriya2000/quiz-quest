'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React, {useCallback, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from 'next/navigation';
import {login, signup} from "@/lib/actions";

const INITIAL_STATE = () => ({
    tab: "login",
    email: "",
    password: "",
    name: "",
    error: undefined,
})

export default function Auth() {

    const [state, setState] = useState(INITIAL_STATE());
    const [error] = useState("");
    const router = useRouter();

    const setError = useCallback((error?: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setState((prevState) => ({
            ...prevState,
            error,
        }));
    }, [])

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }, [])

    const onTabChange = useCallback((tab: string) => {
        setState((prevState) => ({
            ...prevState,
            tab,
        }));
    }, [])

    const onFormSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        const isLoginForm = state.tab === "login";

        if (!state.email || !state.password || (!state.name && !isLoginForm)) {
            setError("All fields are required.");
            return;
        }
        setError("");
        try {
            if (isLoginForm) {
                await login({
                    email: state.email,
                    password: state.password,
                })
            } else {
                await signup({
                    name: state.name,
                    email: state.email,
                    password: state.password,
                })
            }
            router.push("/");
        } catch (error) {
            console.log(error);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(error?.response?.data?.message || "Something went wrong. Please try again later.");
        }

    }, [state.tab, state.email, state.password, state.name, setError, router]);

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Quiz Master</h1>
                <p className="text-muted-foreground mt-2">Test your knowledge and earn coins!</p>
            </div>

            <Tabs defaultValue="login" className="w-full mt-5" value={state.tab} onValueChange={onTabChange}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome Back</CardTitle>
                            <CardDescription>Enter your credentials to continue</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={onFormSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">Email</Label>
                                    <Input
                                        id="login-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        name={"email"}
                                        value={state.email}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="login-password">Password</Label>
                                    <Input
                                        id="login-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        name={"password"}
                                        value={state.password}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                                {state.error ? (
                                    <p className="text-sm text-destructive">{state.error}</p>
                                ) : <></>}
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Account</CardTitle>
                            <CardDescription>Join Quiz Master and start earning coins</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={onFormSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="signup-name">Name</Label>
                                    <Input
                                        id="signup-name"
                                        type="text"
                                        name={"name"}
                                        placeholder="Enter your name"
                                        value={state.name}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        name={"email"}
                                        value={state.email}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        placeholder="Create a password"
                                        name={"password"}
                                        value={state.password}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Sign Up
                                </Button>
                                {state.error ? (
                                    <p className="text-sm text-destructive">{state.error}</p>
                                ) : <></>}
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
};