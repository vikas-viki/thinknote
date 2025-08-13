import { Note } from "src/users/interfaces/user.interface";

export type AuthInputData = { username: string, password: string };

export type UserData = { username: string, notes: Note[], userId: string };

export type AuthenticatedData = UserData & { accessToken: string };