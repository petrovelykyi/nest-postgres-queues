import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class AddUserGuard implements CanActivate {
  constructor(private usersService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      req.user = await this.usersService.findById(req.user.id);
      return true;
    } catch (e) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
  }
}
