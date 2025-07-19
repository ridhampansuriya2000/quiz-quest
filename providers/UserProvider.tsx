'use client';

import {useCallback, useEffect} from "react";
import {me} from "@/lib/actions";
import {useDispatch} from "react-redux";
import {setUser} from "@/lib/store/authSlice";

export default function UserProvider({children}: any) {

    const dispatch = useDispatch();

    const fetchUserDetails = useCallback(async () => {
        try {
            const user = await me();
            dispatch(setUser(user));

        } catch (error) {
            console.log(error);
        }
    }, [dispatch])

    useEffect(() => {
        (async () => await fetchUserDetails())()
    }, [fetchUserDetails])

    return (
        <>
            {children}
        </>
    )
};