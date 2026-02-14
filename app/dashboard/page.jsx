"use client";

import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };


  return ( 
    <div className="p-10 max-w-2xl" >
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {user && (
        <p className="mt-4">Welcome: {user.email}</p>
      )}
      {user && <AddBookmarkForm user={user} />}

      {user && <BookmarkList user={user} />}



      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
