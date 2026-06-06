# UI/UX & Design Component Specification

## 1. Design System & Theme
Aplikasi mengadopsi sistem desain minimalis modern yang disediakan oleh Shadcn UI. 
*   **Theme:** Default Dark Mode (Slate/Zinc palette) untuk memberikan impresi estetik khas "Developer Platform".
*   **Typography:** Inter atau Geist Sans (sans-serif) sebagai font utama.

## 2. Component Composition & Breakdown
Komponen UI wajib dipecah menjadi unit atomik dan ditempatkan sesuai hierarki struktur folder:

### 2.1 Shared Components (`src/components/`)
*   `Navbar.tsx`: Header persisten berisi logo platform, kolom pencarian teks, tombol "Buat Postingan", dan dropdown menu profil user (Avatar).
*   `PostCard.tsx`: Komponen utama penampil postingan menggunakan `@/components/ui/card`. Harus menampilkan avatar pembuat, nama, waktu relatif (e.g., "2 jam lalu"), badge peran, deskripsi teks dengan pembatasan baris (clamp-line), susunan badge stack teknologi, dan tombol aksi "Hubungi via GitHub".

### 2.2 Feature Components (`src/features/`)
*   `feed/components/CreatePostModal.tsx`: Menggunakan `@/components/ui/dialog`. Di dalamnya terdapat form validasi terstruktur menggunakan `@/components/ui/form` dan komponen Input/Textarea standar.
*   `feed/components/PostSkeleton.tsx`: Komponen placeholder animasi loading menggunakan `@/components/ui/skeleton` untuk mendongkrak skor UX (User Experience) sewaktu data fetching sedang berjalan.

## 3. UI Layout Navigation Wireframe
*   `/login`: Halaman terisolasi tanpa Navbar. Layout tengah (Centered flex container) berisi card box bertuliskan judul aplikasi, slogan singkat, dan tombol Google Login Button berlogo resmi.
*   `/feed`: Layout satu kolom terpusat (`max-w-2xl mx-auto`). Sifatnya responsif, menyusut secara proporsional dari resolusi desktop hingga mobile (`px-4 sm:px-0`).
*   `/profile`: Layout dua bagian. Sisi atas berisi detail bio singkat, avatar besar, dan tautan media sosial. Sisi bawah menampilkan daftar riwayat PostCard milik user bersangkutan yang difilter dari backend.