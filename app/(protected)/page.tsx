"use client";


import {useQuery} from "@tanstack/react-query";
import {fetchCategories, fetchQuizzes} from "@/lib/actions";
import {useCallback, useMemo, useState} from "react";
import {Coins, Play} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";

export default function DashboardPage() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [state, setState] = useState({
        selectedCategory: searchParams.get("category") || ""
    })

    const {data: categories} = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories({})
    });

    const {data: quizzes} = useQuery({
        queryKey: ['quizzes'],
        queryFn: () => fetchQuizzes({})
    });

    const categoryList = useMemo(() => {
        return [{value: "", name: "All"}].concat((categories || []).map(({name, _id}: {
            _id: string,
            name: string
        }) => ({
            name, value: _id
        })))
    }, [categories]);

    const quizList = useMemo(() => {
        return (quizzes || []).filter((quiz: { category: { _id: string } }) => {
            if (!state.selectedCategory) return true;
            return quiz.category?._id === state.selectedCategory
        })
    }, [quizzes, state.selectedCategory])

    const onCategoryChangeHandler = useCallback((categoryValue: string) => {
        setState((prevState) => ({
            ...prevState,
            selectedCategory: categoryValue
        }))
    }, [])

    const onclickButtonHandler = (slug: string) => {
        router.push(`/quiz-play/${slug}`)
    }

    return <div className={"flex flex-col w-full py-6 gap-8"}>
        <div className={"flex min-h-fit overflow-x-auto gap-3 px-1 border-b-2 border-accent pb-4"}>
            {
                categoryList.map(({name, value}) => (
                    <div key={value}
                         onClick={onCategoryChangeHandler.bind(null, value)}
                         className={`flex-shrink-0 cursor-pointer rounded-full border p-2 px-4 text-sm font-medium ${state.selectedCategory === value ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground text-muted-foreground"}`}>
                        {name}
                    </div>
                ))
            }
        </div>
        <div className={"grid grid-cols-1 gap-4"}>
            {
                quizList.map((quiz: {
                    _id: string,
                    title: string,
                    description: string,
                    prize: number,
                    entryFee: number,
                    category: { image: string, name: string }
                }) => (
                    <div key={quiz._id}
                         className={"flex rounded-full justify-between bg-primary/10 gap-2 border border-slate-600 p-2"}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={quiz?.category?.image} alt={quiz.title}
                             className={"h-16 object-cover rounded-full aspect-square"}/>
                        <div className={"flex flex-1 justify-end gap-2"}>
                            <div className={"flex flex-col items-end flex-1 gap-1"}>
                                <p className={"text-xs text-cyan-300"}>{quiz.title} | {quiz.category?.name}</p>
                                <p className={"flex text-sm font-semibold gap-0.5 flex-nowrap items-center whitespace-nowrap"}>
                                    Play & Win <span> <Coins
                                    className={"size-5 fill-yellow-400 stroke-yellow-400"}/></span> {quiz.prize} </p>
                                <p className={"whitespace-nowrap py-0.5 px-2 rounded-full bg-green-700/20 text-xs text-green-400 flex gap-0.5 flex-nowrap items-center"}>
                                    Entry Fee <span> <Coins
                                    className={"size-2.5 fill-yellow-400 stroke-yellow-400"}/></span> {quiz.entryFee}
                                </p>
                            </div>
                            <div
                                onClick={() => onclickButtonHandler(quiz._id)}
                                className={"p-1 h-full bg-green-700 flex items-center justify-center aspect-square rounded-full"}>
                                <Play className={"stroke-primary fill-primary size-8"}/>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
}