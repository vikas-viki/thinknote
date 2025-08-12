import { IsString } from "class-validator";

export class AuthInputDTO {
    @IsString()
    username: string;
    @IsString()
    password: string;
}