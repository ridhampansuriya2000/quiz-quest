'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useCallback} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function Auth() {

    const onFormSubmit = useCallback(() => {

    }, [])

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Quiz Master</h1>
                <p className="text-muted-foreground mt-2">Test your knowledge and earn coins!</p>
            </div>

            <Tabs defaultValue="login" className="w-full">
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
                                        // value={loginForm.email}
                                        // onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="login-password">Password</Label>
                                    <Input
                                        id="login-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        // value={loginForm.password}
                                        // onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                        required
                                    />
                                </div>
                                {/*<Button type="submit" className="w-full" /!*disabled={loginMutation.isPending}*!/>*/}
                                {/*    /!*{loginMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}*!/*/}
                                {/*    Login*/}
                                {/*</Button>*/}
                                {/*{loginMutation.error && <p className="text-sm text-destructive">{loginMutation.error.message}</p>}*/}
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
                                        placeholder="Enter your name"
                                        // value={signupForm.name}
                                        // onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        // value={signupForm.email}
                                        // onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        placeholder="Create a password"
                                        // value={signupForm.password}
                                        // onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                                        required
                                    />
                                </div>
                                {/*<Button type="submit" className="w-full" disabled={signupMutation.isPending}>*/}
                                {/*    /!*{signupMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}*!/*/}
                                {/*    Sign Up*/}
                                {/*</Button>*/}
                                {/*{signupMutation.error && <p className="text-sm text-destructive">{signupMutation.error.message}</p>}*/}
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
};