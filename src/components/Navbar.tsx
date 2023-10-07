"use client";

// ** Import Components
import { Button } from "./ui/button";

// ** Import Other
import { IoTimer } from "react-icons/io5";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { IUser } from "@/type/user";

export default function Navbar({ user }: { user?: IUser }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const path = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const isAuthPage = path === "/login";

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <IoTimer className="text-xl" />
        <h1>Time</h1>
      </div>

      {!isAuthPage && (
        <div className="flex items-center gap-4">
          <h5>Hi, {user?.name}</h5>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </div>
  );
}
