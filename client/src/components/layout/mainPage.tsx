import { Outlet, useNavigate } from 'react-router-dom';
import SidebarNavigation from '../SidebarNavigation';
import FeedHeader from '../FeedHeader';
import MobileBottomNav from '../MobileBottomNav';
import { TrendingWidget } from '../TrendingWidget';
import { useTrendingPosts } from '@/hooks/queries/usePost';
import ProfileCompletionBanner from '../ProfileCompletionBanner';

export default function MainPageLayout() {
  const navigate = useNavigate();

  const { data: trends = [], isPending: isTrendsLoading } = useTrendingPosts();

  const handleTrendingTagClick = (tag: string) => {
    navigate(`/feed?search=${encodeURIComponent('#' + tag)}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans text-foreground transition-colors duration-200 md:pb-0">
      <FeedHeader />

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 pt-6 lg:px-6">
        <SidebarNavigation />
        <main className="mx-auto w-full max-w-2xl flex-1 space-y-6 xl:max-w-3xl">
          <Outlet />
        </main>

        <aside className="hidden w-80 shrink-0 space-y-6 lg:block">
          <TrendingWidget
            trends={trends}
            isLoading={isTrendsLoading}
            onTagClick={handleTrendingTagClick}
          />
        </aside>
      </div>

      <MobileBottomNav />
      <ProfileCompletionBanner />
    </div>
  );
}