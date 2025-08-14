import {
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return false;
    }

    try {
      const payload: { userId: string } = this.jwtService.verify(token);

      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.userId
        },
        select: {
          id: true,
          username: true
        }
      });

      if (!user) {
        return false;
      }

      request.user = user;
      return true;
    } catch {
      return false;
    }
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const cookies = request.cookies as Record<string, string> | undefined;
    return cookies?.jwt;
  }
}
