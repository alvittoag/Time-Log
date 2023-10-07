"use client";

// ** Import Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./DatePicker";
import { useToast } from "./ui/use-toast";

// ** Import Icons
import { GrAdd } from "react-icons/gr";

// ** Import Other
import { useLogStore } from "@/store";
import dayjs from "dayjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function NewLog() {
  // ** Zustand State
  const { log, setLog, setLogs } = useLogStore();

  const { toast } = useToast();

  const router = useRouter();

  const supbase = createClientComponentClient();

  const closeDialog = () => {
    document.getElementById("close-btn")?.click();
  };

  const validateLog = () => {
    if (!log.date || !log.note || log.hour === 0) {
      throw "Date or hour can not be empty";
    } else if (log.hour >= 24) {
      throw "Please enter a valid hour";
    }
  };
  const date = log.date as Date;

  const submitLog = async () => {
    try {
      validateLog();

      const { error } = await supbase
        .from("logs")
        .upsert({ ...log, date: dayjs(log.date).format("YYYY-MM-DD") })
        .select("*")
        .single();

      if (!error) {
        setLogs(log, dayjs(log.date).format("YYYY-MM-DD"));

        toast({
          title: "Successfully create log",
          description: `${log.hour} hours in ${date.toDateString()}`,
        });

        closeDialog();

        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Fail to create log",
          description: error.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fail to create log",
        description: error as string,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full sm:w-72 border-dashed border py-3 flex items-center justify-center rounded-md cursor-pointer hover:border-solid">
          <GrAdd />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Log</DialogTitle>

          <DialogDescription>
            {
              "Remeber, time is your most valuable asset - invest it wisely with our Time Log App"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>

            <DatePicker />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hour" className="text-right">
              hour
            </Label>
            <Input
              value={log.hour}
              onChange={(e) =>
                setLog({ ...log, hour: parseInt(e.target.value) })
              }
              id="hour"
              type="number"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note" className="text-right">
              Note
            </Label>
            <Input
              id="note"
              value={log.note}
              onChange={(e) => setLog({ ...log, note: e.target.value })}
              placeholder="note of the log"
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={submitLog}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
