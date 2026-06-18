import type { ReactNode } from "react";

export interface AddPostTabPanelProps {
  createForm: ReactNode;
}

export default function AddPostTabPanel({ createForm }: AddPostTabPanelProps) {
  return (
    <div className="space-y-4 text-left">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Buat Postingan Kolaborasi</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Bagikan ide proyek dan partner yang Anda cari kepada developer lain.
        </p>
      </div>
      {createForm}
    </div>
  );
}
