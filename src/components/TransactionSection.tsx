"use client";
import { Empty, GreenArrow, RedArrow } from "@/app/assets";
import { Button } from "./ui/button";
import { ITransaction } from "@/utils/types";
import { Skeleton } from "./ui/skeleton";

interface TransactionSectionProps {
    transactions?: ITransaction[];
    isLoading?: boolean;
}

const TransactionSection = ({ transactions, isLoading = false }: TransactionSectionProps) => {
    const shouldShowLoading = isLoading || !transactions?.length;

    if (shouldShowLoading) {
        return (
            <div className="space-y-6">
                {[...Array(3)].map((_, idx) => (
                    <div className="flex justify-between" key={idx}>
                        <div className="flex gap-x-3">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                        </div>

                        <div className="text-right space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    return (
        <div>
            {shouldShowLoading ?
                (
                    <div className="space-y-6">
                        {[...Array(3)].map((_, idx) => (
                            <div className="flex justify-between" key={idx}>
                                <div className="flex gap-x-3">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-3 w-32" />
                                    </div>
                                </div>

                                <div className="text-right space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) :
                !transactions?.length ? (
                    <div className="flex justify-center w-1/3 mx-auto ">
                        <div>
                            <Empty className="mb-4" />
                            <div className="font-bold text-[1.75rem] text-(--black)">
                                No matching transaction found for the selected filter
                            </div>
                            <div className="font-medium text-[1rem] my-4">
                                Change your filters to see more results, or add a new <br /> product.
                            </div>
                            <Button
                                size={"lg"}
                                variant="ghost"
                                className="bg-(--light-gray) font-semibold p-6 rounded-full text-[1rem] text-(--black)  cursor-pointer"
                            >
                                Clear Filter
                            </Button>
                        </div>
                    </div>
                ) : (
                    transactions?.map(({ amount, date, type, metadata }, idx) => (
                        <div className="flex justify-between space-y-6" key={idx}>
                            <div className="flex gap-x-3">
                                {type === "deposit" ? (
                                    <GreenArrow className="md:inline-block mb-1 mr-2 hidden " />
                                ) : (
                                    <RedArrow className="md:inline-block mb-1 mr-2 hidden" />
                                )}
                                <div className="font-medium text-[1rem] text-(--black)">
                                    <div className="capitalize">{metadata?.product_name ?? type}</div>
                                    <p
                                        className={`font-medium text-[0.875rem] ${type === "withdrawal" ? "text-[#0EA163]" : "text-(--gray)"
                                            }`}
                                    >
                                        {metadata?.name ?? type}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="font-bold text-[1rem] text-(--black)">
                                    USD{" "}
                                    {amount.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </div>
                                <p className="font-medium text-[0.875rem] text-(--gray)">
                                    {new Date(date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    ))
                )}
        </div>
    );
};

export default TransactionSection;
