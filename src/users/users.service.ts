import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewUser, User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findUser(username: string): Promise<User | undefined> {
        const user = await this.prisma.user.findUnique({
            where: {
                username
            },
            select: {
                password: true,
                notes: {
                    select: {
                        id: true,
                        note: true,
                        title: true,
                        updatedAt: true
                    }
                },
                id: true
            }
        });

        if (user) {
            return {
                userId: user.id,
                username: username,
                password: user.password,
                notes: user.notes
            }
        }
    }

    async createUser(username: string, password: string): Promise<NewUser> {
        const user = await this.prisma.user.create({
            data: {
                username,
                password
            }
        });
        return {
            userId: user.id,
            username: username
        }
    }
}
