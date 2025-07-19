"use client";

import {Input} from "@/components/ui/input";
import {LoaderCircle, Search} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {fetchCategories} from "@/lib/actions";
import React, {useCallback, useState} from "react";
import {useDebounce} from "@/hooks/useDebounce";
import {useRouter} from "next/navigation";

export default function CategoryPage() {

    const router = useRouter();

    const [state, setState] = useState({
        search: ""
    });

    const debounceSearch = useDebounce(state.search)

    const {data, isLoading} = useQuery({
        queryKey: ['categories'].concat(debounceSearch ? `search-${debounceSearch}` : []),
        queryFn: () => fetchCategories({search: debounceSearch})
    });

    const onSearchInputChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            search: event.target.value
        }))
    }, []);
    
    const onCategoryClickHandler = useCallback((category: string) => {
        router.push(`/?category=${category}`)
    }, [router])

    return <div className={"flex flex-col w-full py-6 gap-8"}>
        <p className={"text-center text-lg font-semibold text-primary"}>
            Select the Quiz category that you want to play
        </p>
        <div className={"flex flex-nowrap items-center gap-2 p-3 rounded-4xl border-2 border-primary"}>
            <Search size={24}/>
            <Input
                className={"!p-0 !bg-transparent !border-0 !outline-0 h-auto !ring-0 !text-lg"}
                placeholder={"Search Quiz Category"}
                value={state.search}
                onChange={onSearchInputChangeHandler}
            />
        </div>
        <div className={"grid gap-3 grid-cols-2 py-2"}>
            {
                isLoading ? <div className={"col-span-2 flex items-center justify-center py-4"}>
                    <LoaderCircle className={"animate-spin size-8 mx-auto text-primary"}/>
                </div> : data?.length ? data.map((category: {
                    _id: string,
                    name: string,
                    image: string
                }) => (
                    <div key={category._id}
                         onClick={onCategoryClickHandler.bind(null, category._id)}
                         className={"flex cursor-pointer items-center justify-center gap-2 p-1.5 border-1 border-primary rounded-full"}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={category.image} alt={category.name} className={"w-10 rounded-full aspect-square"}/>
                        <p className={"text-sm flex-1 text-center"}>{category.name}</p>
                    </div>
                )) : <p className={"col-span-2 text-center text-muted-foreground"}>No categories found</p>

            }
        </div>
    </div>
}