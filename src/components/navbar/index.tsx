"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {
    Analytics,
    Chat,
    CRM,
    Home,
    MainStackLogo,
    Notification,
} from "../../../public/assets/svgs/icons";
import { FaMoneyBills } from "react-icons/fa6";
import axiosClient from "@/utils/axios";
import { IUser } from "@/utils/types";
import UserMenu from "../Menuitem";
import { NavAppsMenu } from "../AppsMenu";
import { cn } from "@/lib/utils";
import useMediaQuery from "@/utils/useMediaQuery";

const NavBar = () => {
    const [user, setUser] = React.useState<IUser>();
    const [activeNav, setActiveNav] = React.useState<string>("home");
    const [activeAppItem, setActiveAppItem] = React.useState<string>("Link in Bio");
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isLargeScreen = useMediaQuery("(min-width: 1200px)");

    const fetchUser = async () => {
        try {
            const req = await axiosClient("/user");
            setUser(req?.data);
        } catch (error) { }
    };

    useEffect(() => {
        (async () => {
            await fetchUser();
        })();
    }, []);

    const navItems = [
        { label: "Home", icon: Home },
        { label: "Analytics", icon: Analytics },
        { label: "Revenue", icon: FaMoneyBills },
        { label: "CRM", icon: CRM },
    ];
    return (
        <section className="fixed top-0 left-0 right-0 z-50 mx-8">
            <div className="flex justify-between items-center bg-white rounded-full p-2 shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
                <MainStackLogo />
                <nav>
                    {!isMobile && <ul className="flex items-center lg:gap-x-2 text-[1rem] font-semibold cursor-pointer">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeNav === item.label.toLowerCase();
                            return (
                                <li
                                    onClick={() => {
                                        setActiveNav(item.label.toLowerCase());
                                    }}
                                    key={item.label}
                                    className={cn(
                                        "flex items-center gap-x-1 px-5 py-3 rounded-full transition cursor-pointer",
                                        isActive
                                            ? "bg-black text-white hover:bg-gray-800"
                                            : "hover:bg-black/5"
                                    )}
                                >
                                    <Icon />
                                    <div>{item.label}</div>
                                </li>
                            );
                        })}
                        {isLargeScreen && <NavAppsMenu
                            activeNav={activeNav}
                            setActiveNav={setActiveNav}
                            activeAppItem={activeAppItem}
                            setActiveAppItem={setActiveAppItem}
                        />}
                    </ul>}
                </nav>

                <div className="flex gap-x-6 items-center">
                    <div>
                        <Notification />
                    </div>
                    <div>
                        <Chat />
                    </div>
                    <UserMenu user={user} />
                </div>
            </div>
        </section>
    );
};

export default NavBar;
