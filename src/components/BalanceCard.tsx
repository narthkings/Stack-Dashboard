'use client';
import { Info } from "@/app/assets";

interface BalanceCardProps {
    label: string;
    amount: number;
    currency?: string;
    showInfo?: boolean;
}

export default function BalanceCard({
    label,
    amount,
    currency = "USD",
    showInfo = true,
}: BalanceCardProps) {
    return (
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
    );
}