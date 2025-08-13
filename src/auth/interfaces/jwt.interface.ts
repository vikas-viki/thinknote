import { Notes } from "prisma/client";

export type Payload = { userId: string };

export type User = {
    id: string
    username: string,
    notes: Notes[]
}

declare module 'express' {
    interface Request {
        user?: User
    }
}