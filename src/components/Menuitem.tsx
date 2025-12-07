"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineSwitchAccount } from "react-icons/md";

import { Settings, ShoppingBag, Gift, Bug, LogOut } from "lucide-react";
import { useState } from "react";
import { IUser } from "@/utils/types";
import { Apps } from "@/app/assets";

export default function UserMenu({ user }: { user: IUser | undefined }) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            {/* YOUR TRIGGER */}
            <PopoverTrigger asChild>
                <div
                    className="
            flex items-center gap-x-4 rounded-full 
            w-30 p-3 bg-[#EFF1F6] 
            cursor-pointer select-none
          "
                >
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[linear-gradient(135deg,rgba(92,102,112,1),rgba(19,19,22,1))] text-white text-md">
                            {user?.first_name?.[0]}
                            {user?.last_name?.[0]}
                        </AvatarFallback>
                    </Avatar>

                    <RxHamburgerMenu size={26} className="text-gray-700" />
                </div>
            </PopoverTrigger>

            {/* POPOVER CONTENT */}
            <PopoverContent
                align="end"
                className="
          w-[340px]
          rounded-3xl 
          shadow-xl 
          p-6 
          bg-white 
          border border-gray-100
        "
            >
                {/* TOP USER INFO */}
                <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-14 w-14">
                        <AvatarFallback className="bg-[linear-gradient(135deg,rgba(92,102,112,1),rgba(19,19,22,1))] text-white text-xl">
                            {user?.first_name?.[0]}
                            {user?.last_name?.[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <h3 className="font-semibold text-lg">
                            {user?.first_name} {user?.last_name}
                        </h3>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                </div>

                {/* MENU ITEMS */}
                <div className="space-y-4">
                    <MenuItem
                        icon={<Settings className="h-5 w-5 text-(--gray)" />}
                        label="Settings"
                    />
                    <MenuItem
                        icon={<ShoppingBag className="h-5 w-5 text-(--gray)" />}
                        label="Purchase History"
                    />
                    <MenuItem
                        icon={<Gift className="h-5 w-5 text-(--gray)" />}
                        label="Refer and Earn"
                    />
                    <MenuItem icon={<Apps className="h-5 w-5" />} label="Integrations" />
                    <MenuItem icon={<Bug className="h-5 w-5 text-(--gray)" />} label="Report Bug" />
                    <MenuItem
                        icon={<MdOutlineSwitchAccount className="h-5 w-5 text-(--gray)" />}
                        label="Switch Account"
                    />
                    <MenuItem icon={<LogOut className="h-5 w-5" />} label="Sign Out" />
                </div>
            </PopoverContent>
        </Popover>
    );
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <button className="flex items-center gap-4 w-full text-left py-2 px-2 hover:bg-gray-100 rounded-xl transition">
            {icon}
            <span className="text-[15px]">{label}</span>
        </button>
    );
}
