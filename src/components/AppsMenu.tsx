"use client";

import { Apps } from "@/app/assets";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, AppWindow, Store, Wallet, BookOpen } from "lucide-react";

type NavAppsMenuProps = {
    activeNav: string;
    setActiveNav: (nav: string) => void;
    activeAppItem: string;
    setActiveAppItem: (item: string) => void;
}

export function NavAppsMenu({ activeNav, setActiveNav, activeAppItem, setActiveAppItem }: NavAppsMenuProps) {
    const items = [
        {
            title: "Link in Bio",
            description: "Manage your Link in Bio",
            href: "/link-in-bio",
            icon: (
                <div className="size-12 rounded-2xl bg-white border border-(--light-gray) flex items-center justify-center">
                    <AppWindow className="size-6 text-purple-500" />
                </div>
            ),
        },
        {
            title: "Store",
            description: "Manage your Store activities",
            href: "/store",
            icon: (
                <div className="size-12 rounded-2xl bg-white border border-(--light-gray) flex items-center justify-center">
                    <Store className="size-6 text-orange-500" />
                </div>
            ),
        },
        {
            title: "Media Kit",
            description: "Manage your Media Kit",
            href: "/media-kit",
            icon: (
                <div className="size-12 rounded-2xl bg-white border border-(--light-gray) flex items-center justify-center">
                    <BookOpen className="size-6 text-green-500" />
                </div>
            ),
        },
        {
            title: "Invoicing",
            description: "Manage your Invoices",
            href: "/invoices",
            icon: (
                <div className="size-12 rounded-2xl bg-white border border-(--light-gray) flex items-center justify-center">
                    <Wallet className="size-6 text-purple-500" />
                </div>
            ),
        },
        {
            title: "Bookings",
            description: "Manage your Bookings",
            href: "/bookings",
            icon: (
                <div className="size-12 rounded-2xl bg-white border border-(--light-gray) flex items-center justify-center">
                    <AppWindow className="size-6 text-blue-500" />
                </div>
            ),
        },
    ];

    const isAppsActive = activeNav === "apps" || activeNav === "apps-item";
    const showExpandedView = activeNav === "apps-item";
    const displayText = activeNav === "apps-item" ? activeAppItem : "Link in Bio";
    return (
        <Popover>
            <PopoverTrigger asChild>
                {showExpandedView ? (
                    <div
                        onClick={() => {
                            if (!["apps", "apps-item"].includes(activeNav)) {
                                setActiveNav("apps");
                            }
                        }}
                        className="flex items-center rounded-full overflow-hidden cursor-pointer transition bg-black text-white"
                    >
                        {/* Apps Section */}
                        <div className="flex items-center gap-2 px-5 py-3 transition hover:bg-gray-800 border-r border-gray-700">
                            <Apps />
                            <span className="font-medium">Apps</span>
                        </div>

                        {/* Active Item Section */}
                        <div className="flex items-center gap-2 px-5 py-3 transition hover:bg-gray-800">
                            <span className="font-medium">{displayText}</span>
                            <ChevronDown className="size-4" />
                        </div>
                    </div>
                ) : (
                    // initial view
                    <li
                        onClick={() => setActiveNav("apps")}
                        className={cn(
                            "flex items-center gap-x-1 px-5 py-3 rounded-full transition cursor-pointer",
                            isAppsActive
                                ? "bg-black text-white hover:bg-gray-800"
                                : "hover:bg-black/5"
                        )}
                    >
                        <Apps className="size-4" />
                        <div>Apps</div>
                    </li>
                )}
            </PopoverTrigger>

            <PopoverContent
                align="start"
                className="p-6 w-[420px] rounded-3xl shadow-xl border bg-white"
            >
                <div className="flex flex-col gap-6">
                    {items.map((item, i) => (
                        <div
                            onClick={() => {
                                setActiveAppItem(item.title);
                                setActiveNav("apps-item");
                            }}
                            key={i}
                            className={
                                "flex items-center gap-4 w-full text-left py-2 px-2 hover:bg-white rounded-xl transition hover:shadow-sm"
                            }
                        >
                            {item.icon}

                            <div>
                                <p className="text-[1rem] font-normal group-hover:text-black">
                                    {item.title}
                                </p>
                                <p className="text-sm text-neutral-500">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
