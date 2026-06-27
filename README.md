<div align="center">
  <h1>DevConnect</h1>
  <p><b>The Collaboration Hub for Developers</b></p>
  
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
</div>

<br />

## Halo! Selamat Datang di DevConnect 👋

Pernah merasa mentok saat ingin bikin aplikasi impian karena butuh bantuan teman yang jago desain atau *backend*? Atau sekadar ingin mulai bikin *side-project* untuk mempercantik portofolio tapi bingung mulai dari mana?

Nah, di sinilah **DevConnect** hadir. 

Singkatnya, ini adalah wadah tempat para *developer* ngumpul. Anda bisa dengan mudah membagikan ide proyek yang sedang Anda kerjakan, mencari *partner* kolaborasi yang punya *skill* pas dengan kebutuhan, atau bahkan bergabung dengan ide-ide seru dari teman-teman lain.

---

## Apa Saja yang Bisa Dilakukan?

- **Login Super Praktis:** Tinggal sekali klik pakai akun Google (Google OAuth). Nggak perlu repot bikin dan hapal *password* baru.
- **Feed Interaktif:** Ngobrol, cari *partner*, dan posting ajakan kolaborasi proyek dengan mudah di linimasa utama.
- **Profil Spesialis Anda:** Pamerkan *skill* andalan Anda! Profil ini membantu teman-teman lain untuk melirik Anda saat mereka butuh kolaborator.
- **Navigasi Mulus:** Karena dibangun dengan arsitektur React *Single Page Application*, ngeklik sana-sini terasa instan tanpa harus nunggu loading halaman terus-menerus.

---

## Dapur Teknologi (Tech Stack)

Walau tampilannya simpel, mesin di baliknya lumayan kokoh. Ini dia alat-alat yang kami pakai:

**Di Balik Layar Frontend**
- **React.js & Vite:** Biar aplikasinya kencang dan gampang dikembangkan.
- **Tailwind CSS & Radix UI:** Rahasia kenapa tampilannya rapi, *accessible*, dan modern.
- **Axios:** Jembatan komunikasi yang aman ke backend.

**Di Balik Layar Backend**
- **Node.js & Express.js:** Menangani semua aliran data API.
- **PostgreSQL & Prisma ORM:** Kombinasi asik buat nyimpan database yang super aman dan minim *bug* saat ngoding.
- **JSON Web Token (JWT):** Penjaga gerbang keamanan biar nggak sembarang orang bisa ngerubah data.

---

## Yuk, Cobain Langsung!

Kami sudah men-deploy aplikasi ini supaya bisa Anda coba kapan saja. 
**[Main ke DevConnect Sekarang](https://devconnect-tan-gamma.vercel.app/)**

> *Sedikit info: Karena backend-nya pakai layanan gratis, kalau lagi sepi dia suka "ketiduran". Jadi pas pertama kali buka, mungkin butuh waktu sekitar 30 detik untuk nungguin servernya melek lagi ya.*

---

## Mau Coba Jalankan Sendiri di Laptopmu?

Seru juga lho kalau mau oprek-oprek kode sendiri. Ikuti panduan santai ini:

### 1. Ambil Kodenya (Clone)
```bash
git clone https://github.com/USERNAME_ANDA/dev-social-app.git
cd dev-social-app
```

### 2. Nyalakan Backend (Server)
Buka terminal dan jalankan:
```bash
cd server
pnpm install

# Bikin file rahasia .env
cp .env.example .env 

# Sinkronisasi tabel ke database kamu
pnpm prisma db push

# Nyalakan servernya!
pnpm dev
```
*Sip! Backend jalan di `http://localhost:3000`*

### 3. Nyalakan Frontend (Client)
Buka tab terminal baru:
```bash
cd client
pnpm install

# Bikin file .env (lihat panduan di bawah ya)
cp .env.example .env 

# Nyalakan tampilannya!
pnpm dev
```
*Frontend kamu jalan di `http://localhost:5173`*

---

## Kunci Rahasia (.env)

Kamu wajib punya file `.env` di folder server dan client agar aplikasinya bisa nyambung. Formatnya begini:

**Buat di dalam folder `/server/.env`:**
```env
# Hubungkan ke database Postgres kamu (misalnya dari Supabase atau lokal)
DATABASE_URL="postgres://username_kamu:password_rahasia@host_db_kamu:6543/nama_db?pgbouncer=true"
DIRECT_URL="postgres://username_kamu:password_rahasia@host_db_kamu:5432/nama_db"

# Kunci untuk bikin tiket JWT
JWT_SECRET="tulis_bebas_rahasia_kamu_di_sini"

# Kunci untuk Login Google
GOOGLE_CLIENT_ID="123456789-idklienkamu.apps.googleusercontent.com"

# Alamat frontend biar nggak kena error CORS
FRONTEND_URL="http://localhost:5173"
```

**Buat di dalam folder `/client/.env`:**
```env
# Kunci untuk memunculkan tombol Login Google
VITE_GOOGLE_CLIENT_ID="123456789-idklienkamu.apps.googleusercontent.com"

# Kosongin aja baris ini kalau kamu lagi ngoding di laptop (biar otomatis nembak proxy).
# Nah, kalau mau di-deploy ke Vercel/Netlify, baru deh diisi URL backend kamu.
# VITE_API_URL="URL_BACKEND_KAMU_KALAU_UDAH_ONLINE" 
```

---

## Ikut Berkontribusi? Boleh Banget!

Punya ide fitur seru? Atau ketemu kutu (*bug*) nyebelin? Kami *welcome* banget kalau kamu mau bantu beresin. Langsung aja *fork* repository ini, tambahkan kodemu, dan ajukan *Pull Request* (PR). Mari sama-sama jadikan DevConnect lebih keren!
