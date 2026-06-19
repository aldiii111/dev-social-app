import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import SidebarNavigation from '../SidebarNavigation';
import FeedHeader from '../FeedHeader';
import MobileBottomNav from '../MobileBottomNav';

export default function MainPageLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarNavigation />
      <div className="flex flex-col flex-1 overflow-hidden">
        <FeedHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
          <Outlet /> 
        </main>
        <MobileBottomNav />
      </div>
    </div>
  );
}