import type { ReactNode } from "react";

export interface FeedAppShellProps {
  header: ReactNode;
  sidebar: ReactNode;
  main: ReactNode;
  aside?: ReactNode;
  mobileNav?: ReactNode;
}

export default function FeedAppShell({
  header,
  sidebar,
  main,
  aside,
  mobileNav,
}: FeedAppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans text-foreground transition-colors duration-200 md:pb-0">
      {header}

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 pt-6 lg:px-6">
        {sidebar}

        <main className="mx-auto w-full max-w-2xl flex-1 space-y-6 xl:max-w-3xl">
          {main}
        </main>

        {aside && (
          <aside className="hidden w-80 shrink-0 space-y-6 lg:block">{aside}</aside>
        )}
      </div>

      {mobileNav}
    </div>
  );
}
