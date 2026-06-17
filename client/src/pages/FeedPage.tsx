import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Terminal, 
  MessageSquare, 
  Heart, 
  Share2, 
  Plus, 
  Home, 
  User, 
  LogOut, 
  Sun, 
  Moon, 
  Search, 
  Users, 
  TrendingUp, 
  ExternalLink,
  ChevronRight,
  Filter,
  Image as ImageIcon,
  Code,
  Tag,
  AlertCircle
} from "lucide-react";

// Types matching feed items
interface MockPost {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    isOnline: boolean;
  };
  title: string;
  description: string;
  lookingFor: string;
  stacks: string[];
  codeSnippet?: {
    language: string;
    code: string;
  };
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: string;
}

export default function FeedPage() {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains("dark"));
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [newPostText, setNewPostText] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState("typescript");
  const [codeSnippet, setCodeSnippet] = useState("");
  
  // Toggle Theme Handler
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  // Mock Feed Data - High-quality examples representing real developer posts
  const [posts, setPosts] = useState<MockPost[]>([
    {
      id: "1",
      user: {
        name: "Sarah Jenkins",
        username: "sarah_js",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=sarah",
        isOnline: true,
      },
      title: "Building an AI-Powered Markdown Editor",
      description: "Hey devs! I'm prototyping a real-time collaborative markdown editor that uses AI for content enhancement and auto-completion. Looking for a Backend/DevOps developer who has experience with WebSockets and Dockerizing Node.js apps. Let's build this together!",
      lookingFor: "Backend",
      stacks: ["React", "TypeScript", "Node.js", "WebSockets", "TailwindCSS"],
      codeSnippet: {
        language: "typescript",
        code: `// Express WebSocket Handler for Editor Sync
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    // Broadcast document delta changes
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(data);
      }
    });
  });
});`
      },
      likes: 38,
      comments: 12,
      isLiked: true,
      createdAt: "2 hrs ago"
    },
    {
      id: "2",
      user: {
        name: "Robby Chen",
        username: "robbyc",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=robby",
        isOnline: false,
      },
      title: "Need UI/UX wizard for DevConnect Mobile Companion App",
      description: "Hey guys! I am coding a React Native app as a companion to DevConnect to enable quick networking on the go. The logic is 70% complete but it looks like a typical bootstrap design. Need a UI/UX expert to create clean mockups or jump directly into the code and style it beautifully.",
      lookingFor: "UI/UX",
      stacks: ["React Native", "Expo", "Figma", "TailwindCSS", "Reanimated"],
      likes: 19,
      comments: 4,
      isLiked: false,
      createdAt: "5 hrs ago"
    },
    {
      id: "3",
      user: {
        name: "Aris Munandar",
        username: "arismun",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=aris",
        isOnline: true,
      },
      title: "Distributed Cron Job Scheduler in Go",
      description: "Working on a lightweight distributed scheduler designed specifically for background tasks. It needs robust fault tolerance. If anyone has experience with Redis Sentinel, Raft Consensus, or Rust/Go clustering, drop a comment! Free to collaborate on GitHub.",
      lookingFor: "Fullstack",
      stacks: ["Go", "Redis", "Raft", "Docker", "Next.js"],
      codeSnippet: {
        language: "go",
        code: `package main

import (
	"context"
	"fmt"
	"time"
)

// RunTask starts task schedule loop
func RunTask(ctx context.Context, jobID string, interval time.Duration) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()
	for {
		select {
		case <-ticker.C:
			fmt.Printf("[Job %s] Executing background task\\n", jobID)
		case <-ctx.Done():
			return
		}
	}
}`
      },
      likes: 56,
      comments: 21,
      isLiked: false,
      createdAt: "1 day ago"
    }
  ]);

  // Handle Mock Interactions
  const handleLike = (id: string) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: MockPost = {
      id: Date.now().toString(),
      user: {
        name: user?.name || "Guest Developer",
        username: user?.email ? user.email.split("@")[0] : "guest_dev",
        avatar: user?.avatar_url || "https://api.dicebear.com/7.x/adventurer/svg?seed=guest",
        isOnline: true,
      },
      title: "New Collaboration Request",
      description: newPostText,
      lookingFor: "Frontend",
      stacks: ["React", "TypeScript", "TailwindCSS"],
      likes: 0,
      comments: 0,
      isLiked: false,
      createdAt: "Just now",
      codeSnippet: showCodeInput && codeSnippet ? {
        language: codeLanguage,
        code: codeSnippet
      } : undefined
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
    setSchemaInputs();
  };

  const setSchemaInputs = () => {
    setCodeSnippet("");
    setShowCodeInput(false);
  };

  const filters = ["All", "Frontend", "Backend", "UI/UX", "Fullstack", "Mobile", "DevOps"];

  const filteredPosts = selectedFilter === "All" 
    ? posts 
    : posts.filter(post => post.lookingFor.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 pb-16 md:pb-0 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">DevConnect</span>
        </div>

        {/* Global Search bar */}
        <div className="hidden md:flex items-center relative w-96">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
          <Input 
            placeholder="Search developers, projects, or stack..." 
            className="pl-9 pr-4 py-1.5 bg-secondary/50 border-zinc-200 dark:border-zinc-800 rounded-full text-sm focus-visible:ring-blue-500/30"
          />
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full hover:bg-accent text-zinc-500 hover:text-foreground cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <div className="flex items-center gap-2 border-l pl-3 border-border">
            <Avatar className="w-8 h-8 ring-2 ring-background ring-offset-2 ring-blue-500">
              <AvatarImage src={user?.avatar_url || "https://api.dicebear.com/7.x/adventurer/svg?seed=guest"} />
              <AvatarFallback className="bg-zinc-800 text-zinc-100 text-xs">
                {user?.name?.slice(0, 2).toUpperCase() || "GD"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden lg:block text-left text-xs">
              <p className="font-semibold leading-tight">{user?.name || "Guest Developer"}</p>
              <p className="text-muted-foreground">@{user?.email?.split("@")[0] || "guest"}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout (3-Column standard layout) */}
      <div className="max-w-7xl w-full mx-auto flex-1 flex px-4 lg:px-6 gap-6 pt-6">
        
        {/* Left Sidebar (Desktop Navigation) */}
        <aside className="hidden md:block w-64 shrink-0 space-y-6">
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-3 text-base font-medium py-6 px-4 bg-secondary/80 text-foreground rounded-xl">
              <Home className="w-5 h-5 text-blue-500" />
              Feed
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-base font-medium py-6 px-4 text-muted-foreground hover:text-foreground hover:bg-accent/40 rounded-xl">
              <Users className="w-5 h-5" />
              Connections
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-base font-medium py-6 px-4 text-muted-foreground hover:text-foreground hover:bg-accent/40 rounded-xl">
              <User className="w-5 h-5" />
              Profile
            </Button>
            <Button 
              variant="ghost" 
              onClick={logout}
              className="w-full justify-start gap-3 text-base font-medium py-6 px-4 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-xl cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </nav>

          {/* Quick Profile Summary Widget */}
          <Card className="border border-border bg-card/40 backdrop-blur-md rounded-2xl p-5 overflow-hidden">
            <div className="flex flex-col items-center text-center space-y-3">
              <Avatar className="w-16 h-16 ring-4 ring-blue-500/10">
                <AvatarImage src={user?.avatar_url || "https://api.dicebear.com/7.x/adventurer/svg?seed=guest"} />
                <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() || "GD"}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-base">{user?.name || "Guest Developer"}</h3>
                <p className="text-xs text-muted-foreground">@{user?.email?.split("@")[0] || "guest"}</p>
              </div>
              <div className="flex gap-4 w-full pt-3 border-t border-border/60 text-xs">
                <div className="flex-1">
                  <p className="font-semibold">24</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Connections</p>
                </div>
                <div className="flex-1 border-l border-border/60">
                  <p className="font-semibold">3</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Projects</p>
                </div>
              </div>
            </div>
          </Card>
        </aside>

        {/* Center Main Feed Column */}
        <main className="flex-1 max-w-2xl mx-auto space-y-6">
          
          {/* Post Creation Box */}
          <Card className="border border-border bg-card/65 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden p-4">
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="flex gap-3 items-start">
                <Avatar className="w-10 h-10 border border-border">
                  <AvatarImage src={user?.avatar_url || "https://api.dicebear.com/7.x/adventurer/svg?seed=guest"} />
                  <AvatarFallback>GD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="Describe your project, stack details, and what developer roles you need..."
                    className="w-full bg-transparent border-0 resize-none text-sm focus:ring-0 outline-none min-h-[90px] placeholder:text-zinc-500 py-1"
                  />
                </div>
              </div>

              {/* Code Snippet attachment box if toggled */}
              {showCodeInput && (
                <div className="rounded-xl border border-border bg-zinc-950 p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-semibold uppercase flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                      Attach Source Code
                    </span>
                    <select
                      value={codeLanguage}
                      onChange={(e) => setCodeLanguage(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-zinc-300 rounded px-2.5 py-1 text-xs focus:ring-0 focus:outline-none"
                    >
                      <option value="typescript">TypeScript</option>
                      <option value="javascript">JavaScript</option>
                      <option value="go">Go</option>
                      <option value="rust">Rust</option>
                      <option value="python">Python</option>
                    </select>
                  </div>
                  <textarea
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    placeholder="paste your snippet code here..."
                    className="w-full bg-transparent border-0 font-mono text-xs text-emerald-400 resize-none focus:ring-0 outline-none min-h-[120px] placeholder:text-zinc-600"
                  />
                </div>
              )}

              {/* Footer controls inside Card */}
              <div className="flex justify-between items-center border-t border-border/60 pt-3">
                <div className="flex items-center gap-1.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCodeInput(!showCodeInput)}
                    className={`rounded-lg px-2.5 py-1.5 h-auto text-xs font-semibold cursor-pointer ${showCodeInput ? 'text-blue-500 bg-blue-500/10' : 'text-zinc-500 hover:text-foreground'}`}
                  >
                    <Code className="w-4 h-4 mr-1.5" />
                    Code Block
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="rounded-lg px-2.5 py-1.5 h-auto text-xs font-semibold text-zinc-500 hover:text-foreground cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4 mr-1.5" />
                    Media
                  </Button>
                </div>

                <Button 
                  type="submit"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer shadow-md shadow-blue-500/10 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Post Project
                </Button>
              </div>
            </form>
          </Card>

          {/* Filter Bar with Horizontal Scrolling */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <div className="p-1.5 rounded-lg bg-secondary/80 text-muted-foreground shrink-0">
              <Filter className="w-4 h-4" />
            </div>
            {filters.map((filter) => (
              <Button
                key={filter}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-full px-4 text-xs font-medium cursor-pointer shrink-0 transition-all ${selectedFilter === filter ? 'bg-primary text-primary-foreground' : 'bg-secondary/40 text-muted-foreground hover:bg-accent/60'}`}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Active Filter notification */}
          {filteredPosts.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border rounded-2xl bg-card/20 text-center">
              <AlertCircle className="w-10 h-10 text-muted-foreground mb-3" />
              <h4 className="font-bold text-base">No projects found</h4>
              <p className="text-xs text-muted-foreground max-w-xs mt-1">There are currently no active posts looking for "{selectedFilter}" developers. Try filtering by another role.</p>
            </div>
          )}

          {/* Feed Post List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card 
                key={post.id} 
                className="border border-border bg-card/65 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-zinc-200 dark:hover:border-zinc-800"
              >
                <CardContent className="p-5 space-y-4">
                  {/* Post Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10 border-2 border-background ring-2 ring-border">
                          <AvatarImage src={post.user.avatar} />
                          <AvatarFallback>{post.user.name.slice(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {post.user.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
                        )}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-sm leading-tight">{post.user.name}</h4>
                        <p className="text-xs text-muted-foreground">@{post.user.username} • {post.createdAt}</p>
                      </div>
                    </div>

                    <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/10 font-semibold px-2.5 py-1 text-xs border border-blue-500/20 rounded-full">
                      Looking For: {post.lookingFor}
                    </Badge>
                  </div>

                  {/* Post Title & Description */}
                  <div className="space-y-2 text-left">
                    {post.title && <h3 className="font-bold text-base tracking-tight">{post.title}</h3>}
                    <p className="text-sm text-foreground/90 leading-relaxed font-light whitespace-pre-wrap">{post.description}</p>
                  </div>

                  {/* Attachment: Source Code block rendering (as styled by design.md) */}
                  {post.codeSnippet && (
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-sm font-mono text-xs">
                      <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900 border-b border-zinc-800 text-[10px] text-zinc-400">
                        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-zinc-500">
                          <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                          {post.codeSnippet.language}
                        </span>
                        <span className="text-[10px] text-zinc-600 font-sans">Read-Only View</span>
                      </div>
                      <div className="p-4 overflow-x-auto leading-relaxed text-zinc-300 text-left">
                        <pre className="line-numbers">
                          <code>{post.codeSnippet.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Post Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.stacks.map((stack) => (
                      <Badge 
                        key={stack} 
                        variant="secondary"
                        className="bg-secondary text-zinc-700 dark:text-zinc-300 font-medium px-2 py-0.5 text-xs rounded-lg border border-border/40 hover:bg-accent/40"
                      >
                        <Tag className="w-3 h-3 text-muted-foreground mr-1" />
                        {stack}
                      </Badge>
                    ))}
                  </div>

                  {/* Post Interactive Footer (Stars, Comments, Connect) */}
                  <div className="flex items-center justify-between border-t border-border/40 pt-3">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`rounded-lg h-8 px-3 text-xs font-semibold cursor-pointer transition-all ${post.isLiked ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <Heart className={`w-4 h-4 mr-1.5 ${post.isLiked ? 'fill-red-500' : ''}`} />
                        {post.likes}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg h-8 px-3 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 mr-1.5" />
                        {post.comments}
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-lg h-8 px-3 text-xs font-bold text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 cursor-pointer flex items-center gap-1"
                    >
                      Connect
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </main>

        {/* Right Sidebar Widgets Panel (Desktop only) */}
        <aside className="hidden lg:block w-80 shrink-0 space-y-6">
          {/* Suggested Connections Widget */}
          <Card className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-5">
            <h4 className="font-bold text-sm tracking-tight mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              Suggested Developers
            </h4>
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=david" />
                    <AvatarFallback>DB</AvatarFallback>
                  </Avatar>
                  <div>
                    <h5 className="font-bold text-xs">David Brown</h5>
                    <p className="text-[10px] text-muted-foreground">Go Developer</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold px-2.5 rounded-lg text-blue-500 hover:bg-blue-500/10 cursor-pointer">
                  Connect
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=elena" />
                    <AvatarFallback>EK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h5 className="font-bold text-xs">Elena Kovalev</h5>
                    <p className="text-[10px] text-muted-foreground">UI/UX Designer</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold px-2.5 rounded-lg text-blue-500 hover:bg-blue-500/10 cursor-pointer">
                  Connect
                </Button>
              </div>
            </div>
          </Card>

          {/* Trending Stacks Widget */}
          <Card className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-5">
            <h4 className="font-bold text-sm tracking-tight mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Trending Stacks
            </h4>
            <div className="space-y-3.5 text-xs text-left">
              <div className="flex justify-between items-center">
                <span className="font-mono bg-secondary px-2 py-0.5 rounded text-zinc-700 dark:text-zinc-300">Go / Golang</span>
                <span className="text-muted-foreground font-semibold">124 projects</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono bg-secondary px-2 py-0.5 rounded text-zinc-700 dark:text-zinc-300">TypeScript</span>
                <span className="text-muted-foreground font-semibold">98 projects</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono bg-secondary px-2 py-0.5 rounded text-zinc-700 dark:text-zinc-300">React Native</span>
                <span className="text-muted-foreground font-semibold">56 projects</span>
              </div>
            </div>
          </Card>
        </aside>

      </div>

      {/* Mobile Bottom Navigation Bar (matches design.md checklist) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-lg border-t border-border flex justify-around items-center px-4 z-40">
        <Button variant="ghost" size="icon" className="rounded-xl text-blue-500">
          <Home className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
          <Users className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
          <User className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={logout} className="rounded-xl text-red-500 hover:bg-red-500/10">
          <LogOut className="w-5 h-5" />
        </Button>
      </nav>
    </div>
  );
}
