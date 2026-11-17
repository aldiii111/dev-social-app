import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2, Terminal, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";

export default function SignupPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feed");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password) return;

    try {
      setLoading(true);
      setError(null);
      const resData = await authService.register({ name, email, password });
      login(resData.user, resData.token);
      navigate("/feed");
    } catch (err: any) {
      console.error("Signup Error:", err);
      setError(
        err.response?.data?.message ||
        "Gagal mendaftarkan akun. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row relative overflow-hidden font-sans transition-colors duration-200">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none dark:bg-blue-600/5" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none dark:bg-indigo-600/5" />

      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 bg-sidebar text-sidebar-foreground border-r border-sidebar-border relative">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <Code2 className="w-6 h-6 animate-pulse" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            DevConnect
          </span>
        </div>

        <div className="my-auto max-w-lg space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              Empowering Developers Everywhere
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-foreground">
              The social network built exclusively for{" "}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                developers
              </span>
              .
            </h1>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Find partners for side projects, share code snippets, showcase your stack, and grow your network with devs who speak your language.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-muted/40 dark:bg-zinc-950/30 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-border/80">
            <div className="flex items-center justify-between px-4 py-3 bg-muted/80 dark:bg-zinc-950/60 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <Terminal className="w-3 h-3" /> devconnect.ts
              </span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto text-foreground/90">
              <p className="text-muted-foreground/60">// Initialize your developer connection</p>
              <p>
                <span className="text-pink-500 dark:text-pink-400">const</span> developer ={" "}
                <span className="text-blue-600 dark:text-blue-400">await</span> DevConnect.
                <span className="text-emerald-600 dark:text-green-400">join</span>(&#123;
              </p>
              <p className="pl-4">
                skills: [<span className="text-amber-600 dark:text-amber-300">"React"</span>,{" "}
                <span className="text-amber-600 dark:text-amber-300">"Tailwind"</span>,{" "}
                <span className="text-amber-600 dark:text-amber-300">"Node.js"</span>],
              </p>
              <p className="pl-4">
                passions: [<span className="text-amber-600 dark:text-amber-300">"Open Source"</span>,{" "}
                <span className="text-amber-600 dark:text-amber-300">"Pair Programming"</span>],
              </p>
              <p className="pl-4">
                readyToCollaborate: <span className="text-purple-600 dark:text-purple-400">true</span>
              </p>
              <p>&#125;);</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} DevConnect. Open source community.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 z-10 relative">
        <div className="flex md:hidden items-center gap-2.5 mb-8">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
            <Code2 className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">DevConnect</span>
        </div>

        <div className="w-full max-w-md perspective-1000">
          <Card className="border border-border bg-card/75 backdrop-blur-lg shadow-xl relative overflow-hidden transition-all duration-500 hover:shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />

            <CardHeader className="space-y-2.5 pt-8">
              <CardTitle className="text-2xl font-bold tracking-tight text-center md:text-left text-foreground transition-all duration-300">
                Daftar ke DevConnect
              </CardTitle>
              <CardDescription className="text-center md:text-left text-muted-foreground">
                Buat akun baru untuk mulai mencari partner kolaborasi.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {error && (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-shake">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="leading-snug">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Nama</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    placeholder="Nama lengkap Anda"
                    required
                    className="rounded-xl bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="dev@example.com"
                    required
                    className="rounded-xl bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    placeholder="Minimal 6 karakter"
                    minLength={6}
                    required
                    className="rounded-xl bg-background"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl font-semibold"
                >
                  {loading ? "Mendaftarkan..." : "Daftar"}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Sudah punya akun?{" "}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  Masuk di sini
                </Link>
              </p>
            </CardContent>

            <CardFooter className="pb-8 pt-4 justify-center border-t border-border/50 bg-muted/20">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Secured with JWT Authentication
              </span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
