import { IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFilmDtoType } from '../film.types';

export class CreateFilmDto implements CreateFilmDtoType {
  constructor(title: string, openingCrawl: string, director: string, producer: string, url: string, releaseDate: Date) {
    this.title = title;
    this.openingCrawl = openingCrawl;
    this.director = director;
    this.producer = producer;
    this.url = url;
    this.releaseDate = releaseDate;
  }

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  openingCrawl: string;

  @ApiProperty()
  @IsString()
  director: string;

  @ApiProperty()
  @IsString()
  producer: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsDateString()
  releaseDate: Date;
}
