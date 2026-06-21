import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "@/services/posts.service"
import { mapPostsToCollaborationViews } from "@/features/feed/utils/mapPostToView"
import { queryKeys } from "./queryKeys"

export const usePosts = () => {
    return useQuery({
        queryKey: queryKeys.posts.all,
        queryFn: fetchPosts,
        select: (data) => mapPostsToCollaborationViews(data)
    });
};