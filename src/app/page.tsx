// ** Import Components
import Calendar from "@/components/Calendar";
import Logs from "@/components/Logs";
import Navbar from "@/components/Navbar";
import { NewLog } from "@/components/Newlog";
import { Ilog } from "@/store";

// ** Import Other
import { IUser } from "@/type/user";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return redirect("/login");
  }

  const user = data.session?.user.user_metadata as IUser;

  const { data: logs } = await supabase
    .from("logs")
    .select("*")
    .order("date", { ascending: true });

  return (
    <div className="p-5 space-y-10">
      <Navbar user={user} />

      <NewLog />

      <Calendar logs={logs as Ilog[]} />

      <Logs logs={logs as Ilog[]} />
    </div>
  );
}
