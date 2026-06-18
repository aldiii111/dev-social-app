import type { ReactNode } from "react";

export interface ProfileTabPanelProps {
  children: ReactNode;
}

export default function ProfileTabPanel({ children }: ProfileTabPanelProps) {
  return (
    <div className="space-y-4 text-left">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Profil Developer</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola identitas dan riwayat postingan kolaborasi Anda.
        </p>
      </div>
      {children}
    </div>
  );
}
