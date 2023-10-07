// ** Import Components
import LoginComponent from "./component/LoginComponent";

// ** Import Other
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (data.session) {
    return redirect("/");
  }

  return <LoginComponent />;
}