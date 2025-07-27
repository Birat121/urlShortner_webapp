
# 🔗 NepLinkr - Full Stack URL Shortener

NepLinkr is a modern full-stack URL shortener web application that allows users to shorten long URLs and track analytics such as total clicks, countries, and devices. Built using **React**, **TailwindCSS**, **ShadCN UI**, and **Supabase** as the backend.

---

## 🚀 Features

- ✅ **Shorten URLs** with a clean and responsive UI.
- 📊 **Analytics Dashboard** with:
  - Click count
  - Device breakdown (mobile, desktop, etc.)
  - Country-wise traffic
- 🔒 **Authentication** with Supabase (Email & OAuth support)
- 📁 User Dashboard to manage shortened links
- 🌐 Unique short slugs (customizable support)
- 📈 Realtime tracking via Supabase Edge Functions or Row Level Security + Triggers

---
## 📸 Preview

![Preview Screenshot](./screenshots/dashboard-preview.png) <!-- Replace with actual image path -->

---

## 🛠 Tech Stack

| Frontend | Backend | Styling | Auth & DB |
|----------|---------|---------|------------|
| React 18+ | Supabase (PostgreSQL) | TailwindCSS | Supabase Auth |
| React Router | Supabase Edge Functions | ShadCN UI | Supabase Realtime |

---

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/neplinkr.git
cd neplinkr

cd client
npm install

```
### 2. Create .env file:

```bash

VITE_SUPABASE_URL=https://your-project.supabase.co

VITE_SUPABASE_ANON_KEY=your-anon-key


```
### 3. Start the frontend:
```bash
npm run dev

```

### 👤 User Flow

- Register/Login using Supabase Auth

- Paste your long URL and generate a short link

- Share the short link

- Dashboard shows:

- No. of clicks

- Device type (desktop/mobile/tablet)

- Country of access

- Option to delete/update links


### 📊 Analytics Logic
- Click is tracked via:

- Redirection endpoint (/r/:slug)

- Logs IP, user-agent, and timestamp


### 📦 Dependencies

- @supabase/supabase-js

- react-router-dom

- shadcn/ui

- tailwindcss

## Authors

- [@Birat121](https://github.com/Birat121)


