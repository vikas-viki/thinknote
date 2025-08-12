import { Notes } from "prisma/client";

export type AuthInputData = { username: string, password: string };

export type UserData = { username: string, notes: Notes[], userId: string };

export type AuthenticatedData = UserData & { accessToken: string };