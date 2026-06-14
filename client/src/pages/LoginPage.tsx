import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2, Terminal, Sparkles, AlertCircle, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Custom Demo Login Form States
  const [demoName, setDemoName] = useState("Alex Developer");
  const [demoEmail, setDemoEmail] = useState("alex@devconnect.dev");
  const [demoGithub, setDemoGithub] = useState("github.com/alexdev");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feed");
    }
  }, [isAuthenticated, navigate]);

  // Initialize Google Identity Services
  useEffect(() => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "MOCK_CLIENT_ID";
    
    const initializeGoogle = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response) => {
            try {
              setLoading(true);
              setError(null);
              const resData = await authService.loginWithIdToken({
                id_token: response.credential,
              });
              login(resData.user, resData.token);
              navigate("/feed");
            } catch (err: any) {
              console.error("Google Auth Error:", err);
              setError(
                err.response?.data?.message || 
                "Failed to authenticate with Google. Please try using Demo Login."
              );
            } finally {
              setLoading(false);
            }
          },
          auto_select: false,
        });

        const btnElement = document.getElementById("google-signin-btn");
        if (btnElement) {
          window.google.accounts.id.renderButton(btnElement, {
            theme: "outline",
            size: "large",
            width: btnElement.clientWidth || 320,
            text: "signin_with",
            shape: "pill",
          });
        }
      }
    };

    // Script injection check or direct init
    if (window.google) {
      initializeGoogle();
    } else {
      // Listen for script load if it's dynamic
      const script = document.querySelector('script[src*="gsi/client"]');
      if (script) {
        script.addEventListener("load", initializeGoogle);
      }
    }
  }, [login, navigate]);

  // Bypass / Demo Login Handler
  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulated short delay for animation
    setTimeout(() => {
      try {
        const mockUser = {
          id: `demo-${Date.now()}`,
          name: demoName,
          email: demoEmail,
          avatar_url: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(demoName)}`,
          github_url: demoGithub ? (demoGithub.startsWith("http") ? demoGithub : `https://${demoGithub}`) : null,
          created_at: new Date().toISOString(),
        };
        const mockToken = `demo-jwt-token-${Date.now()}`;
        
        // Save locally to mimic authService behavior
        localStorage.setItem("token", mockToken);
        localStorage.setItem("user", JSON.stringify(mockUser));
        
        login(mockUser, mockToken);
        navigate("/feed");
      } catch (err) {
        setError("Something went wrong with the demo login.");
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row relative overflow-hidden font-sans transition-colors duration-200">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none dark:bg-blue-600/5" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none dark:bg-indigo-600/5" />

      {/* Left Panel: Cool interactive visual code dashboard */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 bg-zinc-950/15 dark:bg-zinc-950/40 border-r border-border relative">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <Code2 className="w-6 h-6 animate-pulse" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-zinc-100 bg-clip-text text-transparent">
            DevConnect
          </span>
        </div>

        {/* Feature visualization card (UIUXProMax styling) */}
        <div className="my-auto max-w-lg space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              Empowering Developers Everywhere
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-white">
              The social network built exclusively for{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                developers
              </span>
              .
            </h1>
            <p className="text-zinc-500/70 text-lg font-light leading-relaxed">
              Find partners for side projects, share code snippets, showcase your stack, and grow your network with devs who speak your language.
            </p>
          </div>

          {/* Interactive Code Preview Window */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-zinc-700/80">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/80 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                <Terminal className="w-3 h-3" /> devconnect.ts
              </span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto text-zinc-300">
              <p className="text-zinc-300/60">// Initialize your developer connection</p>
              <p>
                <span className="text-pink-400">const</span> developer ={" "}
                <span className="text-blue-400">await</span> DevConnect.
                <span className="text-green-400">join</span>(&#123;
              </p>
              <p className="pl-4">
                skills: [<span className="text-amber-300">"React"</span>,{" "}
                <span className="text-amber-300">"Tailwind"</span>,{" "}
                <span className="text-amber-300">"Node.js"</span>],
              </p>
              <p className="pl-4">
                passions: [<span className="text-amber-300">"Open Source"</span>,{" "}
                <span className="text-amber-300">"Pair Programming"</span>],
              </p>
              <p className="pl-4">
                readyToCollaborate: <span className="text-purple-400">true</span>
              </p>
              <p>&#125;);</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} DevConnect. Open source community.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for hackers.</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Sleek, Glassmorphic Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 z-10">
        {/* Mobile Header */}
        <div className="flex md:hidden items-center gap-2.5 mb-8">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
            <Code2 className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight">DevConnect</span>
        </div>

        <div className="w-full max-w-md">
          <Card className="border border-border bg-card/75 backdrop-blur-lg shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
            {/* Ambient accent top-line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />

            <CardHeader className="space-y-2.5 pt-8">
              <CardTitle className="text-2xl font-bold tracking-tight text-center md:text-left">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center md:text-left text-zinc-400 dark:text-zinc-500">
                Choose your preferred way to sign in and connect.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-shake">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="leading-snug">{error}</p>
                </div>
              )}

              {/* Official Google Login Button Placeholder Container */}
              <div className="space-y-3">
                <div 
                  id="google-signin-btn" 
                  className="w-full flex justify-center py-0.5 rounded-full overflow-hidden transition-all duration-200"
                />
                <p className="text-[11px] text-center text-zinc-500">
                  Secured by Google Identity. No passwords needed.
                </p>
              </div>

              {/* Separator */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <span className="relative px-3 text-xs uppercase bg-card text-zinc-500">
                  Or use Demo Access
                </span>
              </div>

              {/* Bypass/Demo Login Form */}
              <form onSubmit={handleDemoLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    required
                    placeholder="e.g. Linus Torvalds"
                    className="bg-background/50 border-zinc-700/50 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    required
                    placeholder="e.g. linus@kernel.org"
                    className="bg-background/50 border-zinc-700/50 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    {/* <Github className="w-3.5 h-3.5 text-zinc-400" /> */}
                    GitHub Profile Link (Optional)
                  </Label>
                  <Input
                    id="github"
                    type="text"
                    value={demoGithub}
                    onChange={(e) => setDemoGithub(e.target.value)}
                    placeholder="github.com/torvalds"
                    className="bg-background/50 border-zinc-700/50 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/10 py-6 rounded-xl transition-all duration-200 hover:-translate-y-[1px] active:translate-y-[1px] cursor-pointer flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Enter Developer Space
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="pb-8 pt-2 justify-center border-t border-border/50 bg-zinc-950/5">
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                This is a secure playground environment
              </span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
