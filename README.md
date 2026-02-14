# 🔖 Smart Bookmark App

A real-time bookmark manager built with Next.js, Supabase, and Tailwind CSS.

## 🚀 Live Demo
👉 [Live URL](ADD_YOUR_VERCEL_LINK_HERE)

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

### Realtime delete not updating
- **Issue:** Delete was not reflecting instantly
- **Fix:** Enabled `REPLICA IDENTITY FULL` and handled realtime events properly

### WebSocket timeout
- **Issue:** Realtime connection closed
- **Fix:** Correct Supabase channel subscription and cleanup

## 📦 Local Setup

```bash
git clone https://github.com/Dhiraj10002/Smart-Bookmarks.git
cd Smart-Bookmarks
npm install
npm run dev
