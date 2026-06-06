# System Architecture & Tech Stack Specification

## 1. High-Level Architecture
Aplikasi ini menggunakan arsitektur Decoupled Client-Server:
*   **Frontend (Client):** Single Page Application (SPA) berbasis React, Vite, dan TypeScript. Di-deploy ke Vercel.
*   **Backend (Server):** RESTful API yang dikembangkan oleh tim Backend partner. Di-deploy ke platform eksternal (Render/Railway).
*   **Database:** Relational Database PostgreSQL yang di-host secara gratis di Supabase atau Neon.tech.

[ Client: React/Vite (Vercel) ]
│
├─ (HTTP Requests via Axios) ──> [ Server: REST API ]
│                                       │
└─ (Auth Flow Token Validation)         ├─ (SQL Queries) ─> [ DB: Postgres (Supabase) ]
│                               │
▼                               ▼
[ Google OAuth API ] <────────────────────┘


## 2. Frontend Tech Stack & Libraries
*   **Runtime & Build Tool:** Node.js v20+, Vite (React-TS template).
*   **Language:** TypeScript (Strict Mode = true).
*   **Styling & UI Components:** Tailwind CSS v4+ & Shadcn UI (berbasis Radix Primitives).
*   **Data Fetching & Server State:** Axios (HTTP Client) & TanStack Query v5 (React Query).
*   **Routing:** React Router DOM v6+.
*   **Authentication Helper:** `@react-oauth/google` atau Firebase Auth Client SDK.

## 3. Data Flow & Caching Strategy
*   Semua state yang berasal dari server (Data postingan, data user profile) dikelola secara eksklusif oleh **TanStack Query**.
*   **Global Client State** (seperti status login, token JWT) disimpan di `localStorage` dan disinkronisasikan ke React Context jika diperlukan.
*   Axios dikonfigurasi menggunakan *Instance interceptor* untuk menyisipkan header `Authorization: Bearer <token>` secara otomatis pada setiap request jika token tersedia.

## 4. Database Schema Definition (PostgreSQL Reference)
Meskipun pengerjaan difokuskan pada FE, Agen AI harus mengetahui struktur data entitas berikut saat melakukan mock atau pemetaan tipe data TypeScript:

### 4.1 Table: `users`
*   `id`: `UUID` (Primary Key, default: `gen_random_uuid()`)
*   `google_id`: `VARCHAR(255)` (Unique, Not Null)
*   `name`: `VARCHAR(100)` (Not Null)
*   `email`: `VARCHAR(150)` (Unique, Not Null)
*   `avatar_url`: `TEXT`
*   `github_url`: `VARCHAR(255)` (Nullable)
*   `created_at`: `TIMESTAMP` (Default NOW)

### 4.2 Table: `posts`
*   `id`: `UUID` (Primary Key)
*   `user_id`: `UUID` (Foreign Key -> `users.id` ON DELETE CASCADE)
*   `title`: `VARCHAR(150)` (Not Null)
*   `description`: `TEXT` (Not Null)
*   `image_url`: `TEXT` (Nullable)
*   `looking_for`: `VARCHAR(50)` (Not Null, e.g., 'Backend', 'Frontend', 'UI/UX')
*   `created_at`: `TIMESTAMP` (Default NOW)

### 4.3 Table: `post_stacks`
*   `id`: `SERIAL` (Primary Key)
*   `post_id`: `UUID` (Foreign Key -> `posts.id` ON DELETE CASCADE)
*   `stack_name`: `VARCHAR(50)` (Not Null, e.g., 'React', 'Go', 'Tailwind')