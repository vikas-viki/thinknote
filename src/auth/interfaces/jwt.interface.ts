
export type Payload = { userId: string };

export type User = {
    id: string
    username: string
}

declare module 'express' {
    interface Request {
        user?: User
    }
}