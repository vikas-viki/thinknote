import { Body, Controller, Get, Post, Response, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInputDTO } from './dtos/auth.dto';
import type { Response as HttpResponse, Request as HttpRequest } from 'express';
import { JwtAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() data: AuthInputDTO, @Response({ passthrough: true }) res: HttpResponse) {
        const user = await this.authService.authenticateUser(data);

        res.cookie('jwt', user.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        })

        return {
            userId: user.userId,
            username: user.username
        };
    }

    @Post('signup')
    async signup(@Body() data: AuthInputDTO, @Response({ passthrough: true }) res: HttpResponse) {
        const user = await this.authService.createUser(data);

        res.cookie('jwt', user.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        })

        return {
            userId: user.userId,
            username: user.username
        };
    }

    @Get('session')
    @UseGuards(JwtAuthGuard)
    getSession(@Request() req: HttpRequest) {
        const user = req.user!;
        return {
            userId: user.id,
            username: user.username
        }
    }

    @Get('logout')
    logout(@Response({ passthrough: true }) res: HttpResponse) {
        console.log('logout')
        res.cookie('jwt', '', {
            maxAge: 1
        })
        return 'Logout successful';
    }
}
