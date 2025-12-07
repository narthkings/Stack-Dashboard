"use client";
import { Info } from "@/app/assets";
import { Skeleton } from "./ui/skeleton";

interface BalanceCardProps {
    label: string;
    amount: number;
    currency?: string;
    showInfo?: boolean;
    isLoading?: boolean;
}

export default function BalanceCard({
    label,
    amount,
    currency = "USD",
    showInfo = true,
    isLoading = false,
}: BalanceCardProps) {

    const shouldShowLoading = isLoading || amount === undefined;
    return (
        <>
            {shouldShowLoading ? (
                <div className="mb-6">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-32" />
                        {showInfo && <Skeleton className="h-4 w-4 rounded-full" />}
                    </div>
                    <Skeleton className="h-9 w-48 mt-2" />
                </div>
            ) : (
                <div className="mb-6">
                    <div className="flex justify-between">
                        <div className="text-[0.875rem] font-medium">{label}</div>
                        {showInfo && <Info className="inline-block ml-2 mb-1" />}
                    </div>
                    <div className="text-[1.75rem] font-bold text-(--black) mt-2">
                        {currency}{" "}
                        {amount.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
