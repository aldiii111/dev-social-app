import { api } from "./apiClient";
import type { GoogleIdTokenRequest, GoogleAuthResponse } from "@/types"

export const authService = {
    /**
     * Kirim id_token ke backend untuk diverifikasi.
     *
     * ALUR:
     * - Google Identity Services (GIS) memanggil callback kita dengan `credential`
     * - `credential` itulah id_token — JWT yang ditandatangani Google
     * - Kita kirim ke backend, backend verifikasi pakai google-auth-library
     * - Backend return JWT kita sendiri + data user
     *
     * Contoh pemakaian di komponen:
     *   google.accounts.id.initialize({
     *     client_id: GOOGLE_CLIENT_ID,
     *     callback: async (res) => {
     *       const data = await authService.loginWithIdToken({ id_token: res.credential })
     *       login(data.user, data.token)  // update AuthContext
     *     }
     *   })
     */
    async loginWithIdToken(data: GoogleIdTokenRequest): Promise<GoogleAuthResponse> {
        const response = await api.post<GoogleAuthResponse>("/auth/google/id-token", data)
        const { token, user } = response.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        return response.data
    },

    logout(): void {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        if (window.google?.accounts?.id) {
            window.google.accounts.id.disableAutoSelect()
        }
    },

    getToken(): string | null {
        return localStorage.getItem("token");
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem("token");
    }
}
