# Product Requirement Document (PRD) - DevConnect (MVP)

## 1. Project Overview
DevConnect adalah platform media sosial mini (MVP) non-unicorn yang dirancang khusus untuk membantu developer Frontend (FE) dan Backend (BE) saling menemukan partner untuk proyek kolaborasi hobi atau pembelajaran. Platform ini berfokus pada kemudahan posting kebutuhan tim, pencarian berdasarkan stack, dan proses login instan tanpa manajemen password.

## 2. Target Audience & Problem Statement
*   **Target:** Developer pemula hingga menengah yang ingin membangun portofolio kolaboratif tetapi kekurangan jaringan (network) untuk mencari partner side-project.
*   **Problem:** Grup diskusi konvensional (Discord/Telegram) terlalu berisik dan pesan lowongan tim cepat tenggelam. Tidak ada standarisasi informasi mengenai stack yang dicari.

## 3. Scope of MVP (Minimum Viable Product)
Aplikasi ini membatasi ruang lingkup fitur secara ketat untuk mencegah over-engineering:
*   Autentikasi menggunakan Google OAuth2 (Single Sign-On).
*   Satu halaman Feed utama berisi daftar postingan pencarian tim.
*   Fitur membuat postingan (Judul, Deskripsi, Peran yang dicari, Badge Tech Stack, opsional: Gambar).
*   Halaman profil ringkas untuk melihat riwayat postingan sendiri dan menautkan link GitHub.
*   *Out of Scope untuk MVP:* Real-time chat kalau bisa ada atau akan ditambahkan nanti, atau (digantikan dengan tombol kontak langsung ke GitHub/Sosmed), Sistem Like/Comment, Algoritma Rekomendasi AI.

## 4. User Journeys & Core Features
### 4.1 Authentication Flow
*   User membuka aplikasi dan melihat Landing/Login Page.
*   User menekan tombol "Login dengan Google".
*   Setelah sukses, user diarahkan ke Halaman Feed.

### 4.2 Post Creation Flow
*   User menekan tombol "Buat Postingan".
*   Sebuah Modal muncul menampilkan form input.
*   User mengisi data, memilih peran yang dicari, dan mengetik tech stack.
*   Setelah submit, data terkirim ke backend, modal tertutup, dan feed otomatis terbarui di layar tanpa reload halaman.

### 4.3 Feed Discovery Flow
*   User dapat melihat kartu-kartu postingan secara kronologis (terbaru di atas).
*   User melihat badge peran (misal: "Butuh Backend") dan badge stack (misal: "Node.js").
*   User dapat mengklik tombol "Hubungi" yang akan membuka tab baru ke profil GitHub pembuat postingan.

## 5. Non-Functional Requirements
*   **UI/UX:** Bersih, responsif (mobile-friendly), menggunakan skema tema gelap/terang standar Shadcn UI.
*   **Performance:** Data fetching harus di-cache di frontend menggunakan TanStack Query untuk menghindari overhead request ke backend gratisan.
*   **Reliability:** Type-safe di seluruh lini menggunakan TypeScript ketat.