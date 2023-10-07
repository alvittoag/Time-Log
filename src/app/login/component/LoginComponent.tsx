"use client";

// ** Import Components
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

// ** Import Other
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LoginComponent() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="p-5">
      <Navbar />
      <div className="flex justify-center items-center h-80vh">
        <div className="text-center space-y-5">
          <p>
            Remember,time is your most valuable asset <br /> invest it wisely
            with our Time Log App!
          </p>
          <Button onClick={handleLogin}>Login with github</Button>
        </div>
      </div>
    </div>
  );
}
