import type {ReactNode} from 'react'
import * as React from "react"
import CoinBox from "@/components/CoinBox";
import ConditionalFooter from "@/components/conditionalFooter";
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import UserProvider from "@/providers/UserProvider";

export default async function ProtectedLayout({children}: { children: ReactNode }) {
    const token = (await cookies()).get('accessToken')?.value

    if (!token) {
        redirect('/login');
    }

    return <UserProvider>
        <div className={"flex flex-col w-full gap-3"}>
            <div className={"flex gap-2 justify-between items-center"}>
                <h1 className={"text-xl font-bold"}>
                    QuizQuest
                </h1>
                <div className={"flex gap-2"}>
                    <CoinBox/>
                </div>
            </div>
            <div className={"flex flex-1 overflow-y-auto"}>
                {children}
            </div>
            <ConditionalFooter/>
        </div>
    </UserProvider>
}