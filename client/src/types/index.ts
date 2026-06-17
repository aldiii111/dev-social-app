// TypeScript interfaces for DevConnect API entities

export interface User {
  id: string;
  // google_id tidak di-expose ke client (sensitive, hanya untuk internal backend)
  name: string;
  email: string;
  avatar_url: string | null;
  github_url: string | null;
  created_at: string;
}

export interface PostStack {
  id: number;
  post_id: string;
  stack_name: string;
}

export type LookingFor = 'Frontend' | 'Backend' | 'UI/UX' | 'Fullstack' | 'Mobile' | 'DevOps';

export interface Post {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string | null;
  looking_for: LookingFor;
  created_at: string;
  // Joined relations from API
  user: User;
  stacks: PostStack[];
}

export interface CreatePostPayload {
  title: string;
  description: string;
  looking_for: LookingFor;
  stacks: string[];
  image_url?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// --- Google OAuth (ID Token Flow) ---
//
// ALUR:
// 1. User klik tombol "Sign in with Google" di frontend
// 2. Google Identity Services (GIS) tampil popup/One Tap
// 3. Setelah user pilih akun, Google callback kita dengan `credential` (= id_token)
// 4. Kita kirim id_token ini ke backend kita via POST
// 5. Backend verifikasi id_token ke Google API (google-auth-library)
// 6. Backend buat/ambil user dari DB, lalu return JWT kita sendiri
// 7. Frontend simpan JWT ke localStorage, update AuthContext

/**
 * Payload yang dikirim ke backend.
 * `id_token` adalah credential JWT dari Google Identity Services.
 * Nilainya didapat dari callback: `google.accounts.id.initialize({ callback: (res) => res.credential })`
 */
export interface GoogleIdTokenRequest {
  id_token: string;
}

/**
 * Response dari backend setelah id_token berhasil diverifikasi.
 * Berlaku untuk login maupun register — Google OAuth tidak membedakan keduanya;
 * backend yang menentukan apakah user sudah ada atau baru.
 */
export interface GoogleAuthResponse {
  /** Data user yang disimpan di database kita */
  user: User;
  /** JWT yang diterbitkan backend kita, bukan milik Google */
  token: string;
  /** true = user baru (first time login), false = user lama */
  is_new_user: boolean;
}
