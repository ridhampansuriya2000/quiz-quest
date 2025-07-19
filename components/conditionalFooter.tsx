"use client";

import FooterButtons from "@/components/FooterButtons";
import {usePathname} from "next/navigation";


export default function ConditionalFooter() {

    const pathname = usePathname()

    const shouldHide =
        pathname.startsWith('/quiz/') &&
        (pathname.split('/').length === 3 || pathname.endsWith('/reward'))

    if (shouldHide) return null

    return <FooterButtons />
}