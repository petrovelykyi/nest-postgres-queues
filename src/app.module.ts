import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { FilmModule } from './modules/film/film.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    DatabaseModule,
    UserModule,
    FilmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
