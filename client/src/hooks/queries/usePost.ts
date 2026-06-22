import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchPosts, fecthPostUser, createPost } from "@/services/posts.service"
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
        queryKey: queryKeys.posts.userPost(userId),
        queryFn: () => fecthPostUser(userId),
        enabled: !!userId,
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