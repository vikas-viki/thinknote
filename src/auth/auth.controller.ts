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
            username: user.username,
            notes: user.notes,
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
            username: user.username,
            notes: user.notes,
        };
    }

    @Get('session')
    @UseGuards(JwtAuthGuard)
    getSession(@Request() req: HttpRequest) {
        const user = req.user!;
        return {
            userId: user.id,
            username: user.username,
            notes: user.notes,
        }
    }

    @Get('logout')
    logout(@Response() res: HttpResponse) {
        res.clearCookie('jwt');
        return;
    }
}
