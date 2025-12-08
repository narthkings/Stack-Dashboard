"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import NavBar from "@/components/navbar";
import { GoDownload } from "react-icons/go";
import { CgChevronDown } from "react-icons/cg";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/MultiSelect";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import axiosClient from "@/utils/axios";
import { ITransaction, IWallet } from "@/utils/types";
import BalanceCard from "@/components/BalanceCard";
import Transaction from "@/components/Transaction";

export default function Home() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [wallet, setWallet] = useState<IWallet>();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trIsLoading, setIsTrxLoading] = useState(false);
  const [openCalendar2, setOpenCalendar2] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));
  const [toDate, setToDate] = useState<Date | undefined>(new Date(2025, 5, 12));
  const [statuses, setStatuses] = useState<string[]>([]);
  const [trxTypes, setTrxTypes] = useState<string[]>([]);
  const data = [
    { date: "Apr 1, 2022", value: 20 },
    { date: "Apr 30, 2022", value: 30 },
  ];

  const statusOptions = [
    { label: "Successful", value: "successful" },
    { label: "Pending", value: "pending" },
    { label: "Failed", value: "failed" },
  ];

  const trxOptions = [
    { label: "Withdrawal", value: "withdrawal" },
    { label: "Deposit", value: "deposit" },
  ];

  const fetchAllTransactions = async () => {
    setIsTrxLoading(true)
    try {
      const req = await axiosClient("/transactions");
      setIsTrxLoading(false)
      setTransactions(req?.data);
    } catch (error) {
      setIsTrxLoading(false)
    }
  };

  const fetchWalletBalance = async () => {
    setIsLoading(true);
    try {
      const req = await axiosClient("/wallet");
      setIsLoading(false);
      setWallet(req?.data);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchAllTransactions();
      await fetchWalletBalance();
    })();
  }, []);

  return (
    <main className="p-8">
      <NavBar />

      <section className="flex flex-col xl:flex-row justify-between space-x-30 mt-40 w-full xl:w-[80%] mx-auto">
        <div className="w-full xl:w-5/6">
          <section className="flex xl:flex-row flex-col space-x-16">
            <BalanceCard
              showInfo={false}
              label="Available Balance"
              amount={wallet?.balance as number}
              isLoading={isLoading}
            />
            <Button
              size={"lg"}
              variant="ghost"
              className="bg-(--black) text-white font-semibold p-6 rounded-full w-full md:w-1/6 text-[1rem] cursor-pointer"
            >
              Withdraw
            </Button>
          </section>
          <div className="w-full h-[300px]">
            <ResponsiveContainer minWidth="100%" minHeight="100%">
              <LineChart data={data} margin={{ top: 60, left: 0, right: 0, bottom: 40 }}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#FF6A00"
                  strokeWidth={3}
                  dot={false}
                />
                <XAxis
                  dataKey="date"
                  axisLine={true}
                  tickLine={false}
                  tick={{ fill: "#A0A6B1", fontSize: 13 }}
                  padding={{ left: 31, right: 25 }}
                />
                <YAxis hide={true} />
                <Tooltip cursor={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full xl:w-1/4">
          <BalanceCard
            label="Ledger Balance"
            amount={wallet?.ledger_balance as number}
            isLoading={isLoading}
          />
          <BalanceCard
            label="Total Payout"
            amount={wallet?.total_payout as number}
            isLoading={isLoading}
          />
          <BalanceCard
            label="Total Revenue"
            amount={wallet?.total_revenue as number}
            isLoading={isLoading}
          />
          <BalanceCard
            label="Pending Payout"
            amount={wallet?.pending_payout as number}
            isLoading={isLoading}
          />
        </div>
      </section>

      <section className="mt-20 w-full xl:w-9/12 mx-auto">
        <div className="flex flex-col xl:flex-row justify-between space-y-6 items-start xl:items-center">
          <div>
            <div className="font-bold text-[1.5rem] text-(--black)">
              {transactions?.length ?? 0} Transactions
            </div>
            <div className="font-medium text-[0.875rem]">
              Your transactions for the last 7 days
            </div>
          </div>
          <div className="flex gap-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size={"lg"}
                  variant="ghost"
                  className="bg-(--light-gray) font-semibold p-6 rounded-full text-[1rem] text-(--black) w-2/4 cursor-pointer"
                >
                  Filter
                  <CgChevronDown />
                </Button>
              </SheetTrigger>

              <SheetContent
                side={"right"}
                className={cn(
                  "bg-background fixed z-50 flex flex-col gap-4 shadow-lg",
                  "transition-transform duration-500 ease-in-out",
                  "translate-x-full",
                  "data-[state=open]:translate-x-0",
                  "data-[state=closed]:translate-x-full",
                  "lg:m-3 w-full md:w-[50%] xl:w-[35%] p-4 rounded-4xl"
                )}
              >
                <SheetHeader>
                  <SheetTitle className="font-bold text-[1.5rem] text-(--black)">
                    Filter
                  </SheetTitle>
                  <SheetDescription>
                    <div className="flex gap-x-2 my-8 overflow-x-scroll">
                      <Badge
                        variant="outline"
                        className="font-semibold text-[0.875rem] h-8 min-w-25"
                      >
                        Today
                      </Badge>
                      <Badge
                        variant="outline"
                        className="font-semibold text-[0.875rem] h-8 min-w-25"
                      >
                        Last 7 days
                      </Badge>
                      <Badge
                        variant="outline"
                        className="font-semibold text-[0.875rem] h-8 min-w-25"
                      >
                        This month
                      </Badge>
                      <Badge
                        variant="outline"
                        className="font-semibold text-[0.875rem] h-8 min-w-25"
                      >
                        Last 3 months
                      </Badge>
                    </div>
                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <div className="text-(--black) font-semibold text-[1rem]">
                          Date Range
                        </div>
                        <div className="flex gap-x-1 w-full px-1 justify-between">
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="date"
                                className="bg-(--light-gray) rounded-xl h-12 w-[50%] justify-between font-normal"
                              >
                                {date
                                  ? date.toLocaleDateString("en-NG", {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                  })
                                  : "Select date"}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
                                buttonVariant="ghost"
                              />
                            </PopoverContent>
                          </Popover>
                          <Popover open={openCalendar2} onOpenChange={setOpenCalendar2}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="date"
                                className="bg-(--light-gray) rounded-xl h-12 w-[50%] justify-between font-normal"
                              >
                                {toDate
                                  ? toDate.toLocaleDateString("en-NG", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })
                                  : "Select date"}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                              side="bottom"
                            >
                              <Calendar
                                mode="single"
                                selected={toDate}
                                onSelect={setToDate}
                                className="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
                                buttonVariant="ghost"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-(--black) font-semibold text-[1rem]">
                          Transaction Type
                        </div>
                        <MultiSelect
                          options={trxOptions}
                          value={trxTypes}
                          onChange={setTrxTypes}
                          placeholder="Select transaction type"
                          className="rounded-xl h-12"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-(--black) font-semibold text-[1rem]">
                          Transaction Status
                        </div>
                        <MultiSelect
                          options={statusOptions}
                          value={statuses}
                          onChange={setStatuses}
                          placeholder="Select transaction status"
                          className="rounded-xl h-12"
                        />
                      </div>
                    </div>
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter className="flex flex-row justify-between gap-3">
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="rounded-full font-semibold text-[1rem] w-2/4"
                      size={"lg"}
                    >
                      Clear
                    </Button>
                  </SheetClose>
                  <Button
                    type="submit"
                    className="rounded-full font-semibold text-[1rem] w-2/4"
                    size={"lg"}
                  >
                    Apply
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              size={"lg"}
              className="bg-(--light-gray) font-semibold p-6 text-(--black) rounded-full text-[1rem] w-3/4 cursor-pointer"
            >
              Export list
              <GoDownload size={"10"} color="#131316" />
            </Button>
          </div>
        </div>

        <hr className="my-10 border-t border-gray-300" />
        <Transaction isLoading={trIsLoading} transactions={transactions} />

      </section>
    </main>
  );
}
