import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const token = req.cookies['Authentication'].split(' ')[1];
      const payload = this.jwtService.verify(token);
      req.user = { id: payload.id };
      return true;
    } catch (e) {
      console.log(e);
      throw new HttpException('Not authorized!', HttpStatus.UNAUTHORIZED);
    }
  }
}
