import React, { useEffect } from 'react';
import { CircleUser, X, ArrowRight, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useUpdateProfile } from '@/hooks/queries/usePost';
import { useState } from 'react';

export default function ProfileCompletionBanner() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [githubUrl, setGithubUrl] = useState('');
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('dismiss_github_nagg') === 'true'
    
    if (user && !user.github_url && !isDismissed) {
      setIsVisible(true)
    }else {
      setIsVisible(false)
    }
  },[user])

  const handleDismiss = () => {
    sessionStorage.setItem('dismiss_github_nagg', 'true')
    setIsVisible(false)
  }

  const handleSubmit = () => {
    if (!githubUrl) return;
    updateProfile(githubUrl)
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="relative rounded-2xl border border-border bg-card/85 p-5 shadow-2xl backdrop-blur-xl transition-all hover:shadow-indigo-500/10">

        <button 
          className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          aria-label="Remind me later"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="rounded-full bg-blue-500/10 p-2.5 text-blue-500 ring-1 ring-blue-500/20">
            <Info className="h-5 w-5" />
          </div>
          
          <div className="space-y-1.5 pr-4">
            <h4 className="font-semibold text-foreground tracking-tight">Complete your profile</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Add your GitHub profile to discover projects, connect with peers, and showcase your stack.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground group-focus-within:text-ring transition-colors">
              <CircleUser className="h-4 w-4" />
            </div>
            <Input
              type="text"
              placeholder="github.com/username"
              className="pl-9 text-sm rounded-xl bg-background/50 focus-visible:ring-ring transition-all border-input hover:border-border/80"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 rounded-xl py-2 h-auto transition-all hover:scale-[1.02] active:scale-[0.98] group"
              onClick={handleSubmit}
              disabled={isPending}
            >
              Save Profile
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        
        {/* Subtle Remind me later link */}
        <div className="mt-3 text-center">
          <button
          onClick={handleDismiss}
          className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline">
            Remind me later
          </button>
        </div>

      </div>
    </div>
  );
}
