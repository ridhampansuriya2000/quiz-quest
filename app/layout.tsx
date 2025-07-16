import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import {Providers} from "@/providers/QueryProviders";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Quiz Quest",
    description: "A fun and engaging quiz app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        >
        <Providers>
            <div className={"flex h-dvh bg-background"}>
                <div className={"flex w-full max-w-md py-2 md:py-3 px-2 md:px-4 overflow-y-auto"}>
                    {children}
                </div>
                <div className={"flex-1 flex border-l"}>
                    <div className="items-center justify-center m-auto p-8 gap-4 flex flex-col">
                        <div className="w-64 h-64 mb-2 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                            <div className="text-7xl">🧠</div>
                        </div>
                        <h2 className="text-3xl font-bold">Challenge Your Mind</h2>
                        <p className="text-lg text-center text-muted-foreground max-w-md">
                            Test your knowledge across various categories and compete with players worldwide
                        </p>
                    </div>
                </div>
            </div>
        </Providers>
        </body>
        </html>
    );
}
