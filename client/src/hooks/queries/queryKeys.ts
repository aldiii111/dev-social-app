export const queryKeys = {
    posts: {
        all: ['posts'] as const,
        list: (filters: string) => ['posts', { filters }] as const,
        detail: (id: string) => ['posts', id] as const,
    },
    user: {
        me: ['user', 'me'] as const,
        profile: (id: string) => ['user', 'profile',  id] as const
    }
}