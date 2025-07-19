'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {useCallback} from 'react';
import RewardGif from "@/image/reward.gif";
import Image from "next/image";


export default function RewardPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const score = searchParams.get('score') || '0';
    const coinsEarned = searchParams.get('coins') || '0';


    const handleGoHome = useCallback(() => {
        router.push('/');
    }, [router]);

    return (
        <div className="flex justify-center w-full text-white px-4 py-10 mx-auto ">
            <div className="px-5 pt-[2rem] pb-20 flex flex-col w-full gap-6">
                <div className="flex items-center justify-center gap-3 mb-4">


                    {/* Title */}
                    <h1 className=" text-2xl font-bold mb-4 text-center ">
                        Congratulations!
                    </h1>
                    <Image
                        src={RewardGif as unknown as string}
                        alt="confetti animation"
                        className="absolute top-[60px] md:top-[50px] h-[150px] w-[350px]  md:h-[200px] object-content transform  z-10"
                    />
                </div>

                {/* Score and Coins Container */}
                <div className="flex items-center gap-3 mb-4 ">
                    {/* Your Score */}
                    <div
                        className="flex flex-col gap-2 w-full bg-[rgb(14,19,68)] border border-border rounded-full py-2 cursor-pointer w-48">
                        <div className="text-white text-center flex flex-col"
                        >
                            <div className="text-lg font-bold">
                                {score}
                            </div>
                            <div className="text-xs text-blue-400">
                                Your Score
                            </div>
                        </div>
                    </div>

                    {/* Coins Earned */}
                    <div
                        className="flex flex-col gap-2 w-full bg-[rgb(14,19,68)] border border-border rounded-full py-2 cursor-pointer w-48">
                        <div className="text-white text-center flex flex-col">
                            <div className="text-lg font-bold">
                                {coinsEarned}
                            </div>
                            <div className="text-xs text-blue-400">
                                Coins Earned
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    {/* Double Your Winnings Button */}
                    <button
                        className="flex gap-2 justify-center rounded-full px-7 py-2 border-2 border-[#1a2f77]"
                    >

                        <div className="flex items-center justify-center space-x-3">

            <span className="text-white font-medium">
              Double Your winnings
            </span>
                        </div>
                    </button>
                </div>

                {/* Spacer */}
                <div className="block h-px w-full border-t border-[#1A2F77] my-4 p-0"/>

                {/* Home Button */}
                <button
                    onClick={handleGoHome}
                    className="bg-[#1a2f77] block text-center w-full text-white font-semibold py-3 px-12 m-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    Home
                </button>
            </div>
        </div>
    );
}
