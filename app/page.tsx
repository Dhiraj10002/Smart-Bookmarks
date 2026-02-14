"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Home() {
const handleGoogleLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });
};

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
