
export type Note = {
    id: string,
    note: string,
    title: string,
    updatedAt: Date
}

export type User = {
    userId: string
    username: string,
    password: string
    notes: Note[]
}

export type NewUser = {
    userId: string,
    username: string
}