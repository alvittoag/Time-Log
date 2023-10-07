"use client";

// ** Import Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Ilog } from "@/store";

export default function Logs({ logs }: { logs: Ilog[] }) {
  return (
    <Table>
      <TableCaption>list of log</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3">Date</TableHead>
          <TableHead className="w-1/3">Hour</TableHead>
          <TableHead className="w-1/3">Note</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {logs?.map((log, key) => {
          const date = log.date as string;

          return (
            <TableRow
              key={key}
              className={cn(log.hour <= 5 ? "bg-red-100" : "")}
            >
              <TableCell className="font-medium">{date}</TableCell>
              <TableCell>{log.hour}</TableCell>
              <TableCell>{log.note}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
