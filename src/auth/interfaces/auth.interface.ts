

export type AuthInputData = { username: string, password: string };

export type UserData = { username: string, userId: string };

export type AuthenticatedData = UserData & { accessToken: string };