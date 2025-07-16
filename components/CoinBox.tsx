'use client';

import {Button} from "@/components/ui/button";
import {Coins} from "lucide-react";

export default function CoinBox() {
    return (<>
        <Button size={"sm"} variant={"secondary"}>
            <Coins className={"size-4 fill-yellow-400 stroke-yellow-400"}/>
            25 Coin
        </Button>
    </>)
}