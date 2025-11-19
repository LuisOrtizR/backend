import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }

    const req = context.switchToHttp().getRequest();

    // user.userId viene desde JwtStrategy
    req.user = { 
      userId: user.userId, 
      email: user.email 
    };

    return req.user;
  }
}
