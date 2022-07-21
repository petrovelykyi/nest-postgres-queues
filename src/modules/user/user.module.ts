import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { JWTModule } from '../jwt/jwt.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProvider } from './user.provider';

@Module({
  imports: [DatabaseModule, JWTModule],
  controllers: [UserController],
  providers: [UserService, ...userProvider],
})
export class UserModule {}
