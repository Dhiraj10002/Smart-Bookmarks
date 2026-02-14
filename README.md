# 🔖 Smart Bookmark App

A real-time bookmark manager built with Next.js, Supabase, and Tailwind CSS.

## 🚀 Live Demo
👉 [Live URL](https://smart-bookmarks-one.vercel.app/)

## ✨ Features

- 🔐 Google OAuth authentication
- ➕ Add bookmarks (title + URL)
- 🔒 User-specific private bookmarks (RLS)
- ⚡ Real-time sync across tabs
- 🗑️ Instant delete with optimistic UI
- 🎨 Clean responsive UI

## 🛠️ Tech Stack

- Next.js (App Router)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS
- Vercel (Deployment)

## 🧠 Problems Faced & Solutions

### 1.  Realtime delete not updating
- **Issue:** Delete was not reflecting instantly
- **Fix:** Enabled `REPLICA IDENTITY FULL` and handled realtime events properly

### 2. WebSocket timeout
- **Issue:** Realtime connection closed
- **Fix:** Correct Supabase channel subscription and cleanup

 ### 3. RLS policies blocking data access

Issue: Initially bookmarks were not visible due to Row Level Security.

✅ Solution: Created policies:

SELECT → user_id = auth.uid()

INSERT → user_id = auth.uid()

DELETE → user_id = auth.uid()


 ### 4. Google OAuth redirect failed after deployment

Issue: Google login worked locally but failed on Vercel.

Root Cause: Production URL not added in Supabase Auth settings.

✅ Solution:

Updated in Supabase:

Site URL

Redirect URLs

Result:
OAuth works in production.

## 📦 Local Setup

```bash
git clone https://github.com/Dhiraj10002/Smart-Bookmarks.git
cd Smart-Bookmarks
npm install
npm run dev
