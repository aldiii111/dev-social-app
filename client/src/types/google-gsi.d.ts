interface GoogleAccountsId {
    initialize(config: {
        client_id: string
        callback: (response: { credential: string }) => void
        auto_select?: boolean
        cancel_on_tap_outside?: boolean
    }): void
    prompt(): void
    renderButton(parent: HTMLElement, options?: {
        theme?: 'outline' | 'filled_blue' | 'filled_black'
        size?: 'large' | 'medium' | 'small'
        text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
        shape?: 'rectangular' | 'pill' | 'circle' | 'square'
        width?: number
    }): void
    disableAutoSelect(): void
}

interface Window {
    google?: {
        accounts: {
            id: GoogleAccountsId
        }
    }
}
