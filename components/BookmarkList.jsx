"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function BookmarkList({ user }) {
  const [bookmarks, setBookmarks] = useState([]);

  // ✅ Fetch bookmarks (memoized)
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const fetchBookmarks = useCallback(async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Failed to load bookmarks");
      return;
    }

    setBookmarks(data || []);
  }, [user?.id]);

  // ✅ Realtime subscription
  useEffect(() => {
    if (!user?.id) return;

    fetchBookmarks();

    const channel = supabase
      .channel(`bookmarks-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, fetchBookmarks]);

  // ✅ Optimistic delete
  const handleDelete = async (id) => {
    // instant UI update
    setBookmarks((prev) => prev.filter((b) => b.id !== id));

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete failed:", error);
      toast.error("Delete failed");
      fetchBookmarks(); // rollback
      return;
    }

    toast.success("Bookmark deleted");
  };

  return (
    <div className="mt-8 space-y-3">
      <h2 className="text-xl font-semibold">Your Bookmarks</h2>

      {bookmarks.length === 0 && (
        <p className="text-gray-400">No bookmarks yet.</p>
      )}

      {bookmarks.map((bm) => (
        <div
          key={bm.id}
          className="flex items-center justify-between bg-gray-900 p-3 rounded"
        >
          <div className="min-w-0">
            <p className="font-medium truncate">{bm.title}</p>
            <a
              href={bm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-sm break-all"
            >
              {bm.url}
            </a>
          </div>

          <button
            onClick={() => handleDelete(bm.id)}
            className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
