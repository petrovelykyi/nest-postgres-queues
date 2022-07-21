import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { JWTModule } from '../jwt/jwt.module';
import { PROCESSORS } from './film.constants';
import { FilmController } from './film.controller';
import { FilmProcessor } from './film.processor';
import { FilmService } from './film.service';
import { filmProvider } from './film.provider';

@Module({
  imports: [
    DatabaseModule,
    JWTModule,
    BullModule.registerQueue({
      name: PROCESSORS.film,
    }),
  ],
  controllers: [FilmController],
  providers: [FilmService, FilmProcessor, ...filmProvider],
})
export class FilmModule {}
