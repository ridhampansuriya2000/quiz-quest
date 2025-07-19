'use client';


import {useParams,useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {fetchQuestions} from "@/lib/actions";
import {useCallback, useEffect, useMemo, useState} from "react";

export default function QuizPlayPage() {

    const router = useRouter();

    const [state, setState] = useState({
        currentQuestionIndex: 0,
        coin: 0,
        remainTime: 0,
        selectedOption: null
    });

    const {_id} = useParams();

    const {data} = useQuery({
        queryKey: ['questions'].concat(_id ? `quiz-${_id}` : []),
        queryFn: async () => {
                const data = await fetchQuestions({quiz: _id as string})
            if (data.length) {
                setState((prevState) => ({
                    ...prevState,
                    remainTime: 120,
                }));

                const interval = setInterval(() => {
                    setState((prevState) => {
                        if (prevState.remainTime <= 0) {
                            clearInterval(interval);
                            return {...prevState, remainTime: 0};
                        }
                        return {...prevState, remainTime: prevState.remainTime - 1};
                    });
                }, 1000);

                return data;
            }
        }
    });


    const currentQuestion = useMemo<{
        question: string,
        options: { _id: string, text: string, isCorrect: boolean }[]
    } | undefined>(() => {
        if (data && data.length > state.currentQuestionIndex) {
            return data[state.currentQuestionIndex];
        }
        return undefined;
    }, [data, state.currentQuestionIndex]);

    const correctOption = useMemo(() => {
        return currentQuestion?.options?.find?.((option) => option.isCorrect);
    }, [currentQuestion])

    const onOptionSelect = useCallback((id: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setState((prevState) => ({
            ...prevState,
            selectedOption: id,
            coin: prevState.coin + ((correctOption?._id === id) ? 50 : -25),
        }))

        setTimeout(() => {
            setState((prevState) => ({
                ...prevState,
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
                selectedOption: null
            }))
        }, 1000)
    }, [correctOption?._id]);

    useEffect(() => {
        if (!data?.length) return;

        const quizOver =
            state.currentQuestionIndex >= data.length || state.remainTime <= 0;

        if (quizOver) {
            router.push(`/quiz/${_id}/reward?score=${state.coin}`);
        }
    }, [state.currentQuestionIndex, state.remainTime, data, _id, router]);



    return (<>
        <div className={"flex flex-col w-full py-6 gap-8"}>
            {data?.length ?
                <>
                    <div className={"flex gap-2 flex-nowrap items-center"}>
                        <p>
                            Question {state.currentQuestionIndex + 1}/{data?.length}
                        </p>
                        <div
                            className={`flex-1 h-1 relative ${state.remainTime > 90 ? "bg-green-700" : state.remainTime > 30 ? "bg-orange-600" : "bg-red-700"}`}>
                            <div
                                style={{width: `${(100 - (state.remainTime * 100 / 120))}%`}}
                                className={`absolute transition-all inset-0 left-0 top-0 h-1 ${state.remainTime > 90 ? "bg-green-300/50" : state.remainTime > 30 ? "bg-orange-300/50" : "bg-red-300/50"}`}/>
                        </div>
                        <p>
                            {state.remainTime}
                        </p>

                    </div>
                    <div className={"flex flex-col gap-4 mt-4"}>
                        <p className={"text-xl font-semibold text-center"}>{currentQuestion?.question}</p>
                        <div className={"grid grid-cols-2 gap-2"} style={{gridTemplateColumns: "repeat(2, 1fr)"}}>
                            {
                                currentQuestion?.options.map?.((option) => (
                                    <div key={option.text}
                                         onClick={onOptionSelect.bind(null, option._id)}
                                         className={`flex transition-all cursor-pointer w-full rounded-full items-center justify-center bg-primary/10 gap-2 border border-slate-600 px-2 py-3 ${state.selectedOption ? state.selectedOption === option._id ? option.isCorrect ? "border-green-500 !bg-green-700" : "border-red-500 !bg-red-700" : option.isCorrect ? "border-green-500 !bg-green-700" : "" : ""}`}>
                                        {option.text}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <p className={"text-center text-xl font-bold"}>
                            Your Score : <span className={"text-yellow-400 "}>{state.coin}</span>
                        </p>
                    </div>
                </> : <></>
            }
        </div>
    </>)

}
