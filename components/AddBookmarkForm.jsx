"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddBookmarkForm({ user }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddBookmark = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("bookmarks").insert([
      {
        url,
        title,
        user_id: user.id, // 🔥 IMPORTANT
      },
    ]);

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      setUrl("");
      setTitle("");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleAddBookmark} className="mt-6 space-y-3 max0-w-md">
      <input
        type="text"
        placeholder="Bookmark title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
       className="border p-2 w-full rounded bg-white text-black"
        required
      />

      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-full rounded bg-white text-black"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Bookmark"}
      </button>
    </form>
  );
}
