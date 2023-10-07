"use client";

// ** Import Components
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// ** Import Other
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { useLogStore } from "@/store";

export default function Calendar() {
  const { logs } = useLogStore();

  const getDateInMonth = (year = dayjs().year(), month = dayjs().month()) => {
    const startDate = dayjs().year(year).month(month).date(1);
    const endDate = startDate.endOf("month");

    const datesArray = [];

    for (let i = startDate.date(); i <= endDate.date(); i++) {
      datesArray.push(startDate.date(i).format("YYYY-MM-DD"));
    }

    return datesArray;
  };

  const getColor = (hour: number) => {
    if (hour === 0) {
      return "bg-gray-100";
    } else if (hour < 5) {
      return "bg-green-100";
    } else if (hour < 10) {
      return "bg-green-300";
    } else {
      return "bg-green-500";
    }
  };

  return (
    <div className="border border-dashed flex flex-wrap gap-2 p-10 justify-center rounded-md">
      {getDateInMonth().map((date, index) => {
        const log = logs[date];

        return (
          <HoverCard key={index}>
            <HoverCardTrigger>
              <div
                className={cn(
                  "h-5 w-5 bg-gray-100 rounded-sm cursor-pointer",
                  getColor(log?.hour || 0)
                )}
              />
            </HoverCardTrigger>

            <HoverCardContent>
              {log?.hour || 0} hours on {date}
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}
