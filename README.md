# Bazar Dor (বাজার দর) — Daily Commodity Price Tracker

A modern, responsive, and data-driven commodity price tracking web application for Bangladesh, built with Next.js 16 (App Router), React 19, Tailwind CSS v4, MongoDB Atlas, and Better Auth.

---

## 🌟 Key Features

1. **Daily Price Ticker (মার্কেট টিকার)**:
   - Dynamic marquee displaying real-time price updates and trend indicators for commodities.
   
2. **Market Movers (বাজারের ওঠানামা)**:
   - **Top Risers (আজ দাম বেড়েছে)**: Highlights commodities with the largest price increases.
   - **Top Fallers (আজ দাম কমেছে)**: Highlights commodities with noticeable price drops.

3. **Complete Commodity Directory (সব পণ্য)**:
   - Search by commodity name (e.g., আলু, পেঁয়াজ, চাল, ডিম).
   - Category filtering (চাল, ডাল, তেল, সবজি, মাছ ও মাংস, মসলা).
   - Price sorting (কম থেকে বেশি, বেশি থেকে কম).

4. **Category Breakdown Pages (`/category/[slug]`)**:
   - Filtered view by specific food or grocery categories with total product counts.

5. **Protected Commodity Detail Pages (`/product/[slug]`)**:
   - Comprehensive statistical cards: **সর্বনিম্ন দাম**, **সর্বোচ্চ দাম**, and **গড় দাম**.
   - Division-wise market price breakdown table (ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, সিলেট, বরিশাল, রংপুর, ময়মনসিংহ).
   - Server-side session authentication protection with auto-redirect to sign-in.

6. **Authentication & User Profile**:
   - Email/password authentication, Google OAuth, and GitHub OAuth powered by **Better Auth** and **MongoDB Atlas**.
   - User profile overview (`/profile`) and name update capability (`/profile/update`).
   - Interactive user dropdown in the Navbar with session indicator.

7. **Bengali Localization & Figma Design**:
   - Full localized formatting for Bengali dates, numbers, currency symbols (৳), and units (কেজি, লিটার, হালি).
   - Authentic, clean Figma pixel-perfect card design and layout.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Authentication**: [Better Auth](https://better-auth.com/) with MongoDB Adapter
- **Notification**: [Sonner](https://sonner.emilkowal.ski/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/umaer-islam/assignment-07.git
cd assignment-07
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and configure the following variables:

```env
# Live API URL
NEXT_PUBLIC_BAZAR_DOR_API_URL=https://openapi.programming-hero.com/api/bazardor

# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/bazar_dor?retryWrites=true&w=majority
MONGODB_DB_NAME=bazar_dor

# Better Auth Configuration
BETTER_AUTH_SECRET=your_generated_random_secret_32_bytes
BETTER_AUTH_URL=http://localhost:3000

# Optional Social OAuth Providers
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

> **Tip**: Generate a secure `BETTER_AUTH_SECRET` using Node.js:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
> ```

### 4. Run the Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Available Scripts

- `npm run dev` — Starts the development server with Turbopack.
- `npm run build` — Builds the application for production.
- `npm run start` — Starts the production server.
- `npm run lint` — Runs ESLint checks.
