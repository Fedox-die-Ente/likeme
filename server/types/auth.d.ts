declare module '#auth-utils' {
    interface User {
        githubId: number
        name: string
        avatarUrl: string
        username: string
    }

    interface UserSession {
        // Add other session data if needed
    }
}

export {}

