"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";
import {logout} from "@/lib/actions";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "@/lib/store/authSlice";
import ProfileImage from "@/image/profile.jpg";
import Image from "next/image";

export default function ProfilePage() {

    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(store => store.auth?.user)

    const searchParams = useSearchParams();

    const coinsEarned = searchParams.get('coins') || '0';

    const onLogoutButtonClickHandler = useCallback(async () => {
        await logout();
        dispatch(setUser(null));
        router.push('/login');
    }, [dispatch, router])

    console.log({user});


    return (
        <div className="flex justify-center w-full text-white px-4 py-10 mx-auto ">
            <div className="px-5 pt-[2rem] pb-20 flex flex-col w-full gap-6">

                <div className="flex items-center justify-center gap-3 mb-4">
                    <Image
                        src={ProfileImage}
                        alt="Profile icon"
                        className="h-[150px] w-[150px] md:h-[200px] md:w-[200px] object-content transform z-10 rounded-full border-2 border-blue-500 shadow-lg"
                    />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-center">
                        {user?.name}
                    </h1>
                    <p className="text-md text-center text-gray-400">{user?.email}</p>
                </div>


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

                <div className="flex items-center justify-center mt-6">
                    <button
                        onClick={onLogoutButtonClickHandler}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                        LOGOUT
                    </button>
                </div>


            </div>
        </div>)
}