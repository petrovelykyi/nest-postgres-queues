import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: `${process.env.COOKIE_MAX_AGE}d` },
    }),
  ],
  exports: [JwtModule],
})
export class JWTModule {}
