import * as bcrypt from "bcrypt";
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedData, AuthInputData, UserData } from "./interfaces/auth.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    SALT_ROUNDS = 10;
    PASSWORD_MIN_LENGTH = 6;

    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async authenticateUser(data: AuthInputData): Promise<AuthenticatedData> {
        const user = await this.validateUser(data);

        if (!user) {
            throw new UnauthorizedException();
        }


        const accessToken = await this.jwtService.signAsync({ userId: user.userId });

        return {
            accessToken,
            userId: user.userId,
            username: user.username,
            notes: user.notes
        }
    }

    async validateUser(data: AuthInputData): Promise<UserData | null> {
        const user = await this.userService.findUser(data.username);

        if (!user) {
            return null;
        }
        const valid = this.compare(data.password, user.password);
        if (!valid) {
            return null;
        }

        return {
            userId: user.userId,
            username: user.username,
            notes: user.notes
        };
    }

    hash(data: string): string {
        const res = bcrypt.hashSync(data, this.SALT_ROUNDS);
        return res;
    }

    compare(plain: string, hashed: string): boolean {
        return bcrypt.compareSync(plain, hashed);
    }

    async createUser(data: AuthInputData): Promise<AuthenticatedData> {
        const user = await this.userService.findUser(data.username);

        if (user) {
            throw new ConflictException('Username already exists');
        }
        if (data.password.length < this.PASSWORD_MIN_LENGTH) {
            throw new BadRequestException('Password must be 6 characters or more');
        }

        const hashedPassword = this.hash(data.password);
        const newUser = await this.userService.createUser(data.username, hashedPassword);
        const accessToken = await this.jwtService.signAsync({ userId: newUser.userId });

        return {
            accessToken,
            userId: newUser.userId,
            username: newUser.username,
            notes: []
        }
    }
}
