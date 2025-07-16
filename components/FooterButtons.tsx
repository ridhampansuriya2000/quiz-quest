"use client"

import {CircleUserRound, House, LayoutPanelTop} from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {usePathname} from "next/navigation";

const BUTTONS = [
    {
        label: "Category",
        href: "/category",
        Icon: LayoutPanelTop
    },
    {
        label: "Home",
        href: "/",
        Icon: House
    },
    {
        label: "Profile",
        href: "/profile",
        Icon: CircleUserRound
    }
]


export default function FooterButtons() {

    const pathname = usePathname();

    return (
        <div className={"flex"}>
            <NavigationMenu className={"mx-auto"} viewport={false}>
                <NavigationMenuList className={"flex gap-6"}>
                    {BUTTONS.map(({Icon, href, label}) => (
                        <NavigationMenuItem key={href}>
                            <NavigationMenuLink asChild>
                                <Link href={href}
                                      className={`flex ${pathname === href ? "text-primary bg-accent" : ""} !rounded-4xl flex-col items-center gap-1 text-foreground !text-md min-w-[88px]`}>
                                    <Icon className={"text-foreground"}/>
                                    {label}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}