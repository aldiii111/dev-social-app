import type { ReactNode } from "react";

export interface FeedTabPanelProps {
  showInlineForm?: boolean;
  createForm?: ReactNode;
  postList: ReactNode;
}

export default function FeedTabPanel({
  showInlineForm = true,
  createForm,
  postList,
}: FeedTabPanelProps) {
  return (
    <div className="space-y-6">
      {showInlineForm && createForm && (
        <div className="hidden md:block">{createForm}</div>
      )}
      {postList}
    </div>
  );
}
