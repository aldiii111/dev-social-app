import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchPosts, fetchPostUser, createPost, fetchTrendingPosts } from "@/services/posts.service"
import { mapPostsToCollaborationViews } from "@/features/feed/utils/mapPostToView"
import { queryKeys } from "./queryKeys"

export const usePosts = () => {
    return useQuery({
        queryKey: queryKeys.posts.all,
        queryFn: fetchPosts,
        select: (data) => mapPostsToCollaborationViews(data)
    });
}

export const usePostUser = (userId?: string) => {
    return useQuery({
        queryKey: queryKeys.posts.userPost(userId!),
        queryFn: () => fetchPostUser(userId!),
        enabled: !!userId,
        select: (data) => mapPostsToCollaborationViews(data)
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
        }
    })
}

export const useTrendingPosts = () => {
    return useQuery({
        queryKey: queryKeys.posts.trending,
        queryFn: fetchTrendingPosts,
    });
}