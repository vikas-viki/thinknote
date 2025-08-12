import { Notes } from "prisma/client"

export type User = {
    userId: string
    username: string,
    password: string
    notes: Notes[]
}

export type NewUser = {
    userId: string,
    username: string
}