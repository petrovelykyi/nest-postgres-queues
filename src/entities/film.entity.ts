import { BeforeInsert, BeforeUpdate, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFilmDto } from '../modules/film/dto/create-film.dto';
import { FilmType } from '../modules/film/film.types';

@Entity({ name: 'film' })
export class Film extends CreateFilmDto implements FilmType {
  constructor(title: string, openingCrawl: string, director: string, producer: string, url: string, releaseDate: Date) {
    super(title, openingCrawl, director, producer, url, releaseDate);
  }

  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'ID' })
  id: number;

  @Column()
  @Index({ unique: true })
  @ApiProperty({
    example: '',
    description: 'Title',
  })
  title: string;

  @Column()
  @ApiProperty({
    example: '',
    description: 'Opening crawl',
  })
  openingCrawl: string;

  @Column()
  @ApiProperty({
    example: '',
    description: 'Director`s name',
  })
  director: string;

  @Column()
  @ApiProperty({
    example: '',
    description: 'Producer name',
  })
  producer: string;

  @Column()
  @ApiProperty({
    example: '',
    description: 'URL',
  })
  url: string;

  @Column()
  @ApiProperty({
    example: '',
    description: 'Release date',
  })
  releaseDate: Date;

  @Column()
  @ApiProperty({
    example: '',
    description: 'Date of creation',
  })
  created: Date;

  @Column()
  @ApiProperty({
    example: '',
    description: 'Edit date',
  })
  edited: Date;

  @BeforeInsert()
  insertCreatedDate(): void {
    const now = new Date();
    this.created = now;
    this.edited = now;
  }

  @BeforeUpdate()
  updateEditedDate(): void {
    this.edited = new Date();
  }
}
