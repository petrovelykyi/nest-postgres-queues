import { InjectQueue } from '@nestjs/bull';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { REPOS } from '../database/database.constants';
import { Film } from '../../entities/film.entity';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FILM_PROCESSES, PROCESSORS } from './film.constants';

@Injectable()
export class FilmService {
  constructor(
    @Inject(REPOS.film_repository)
    private readonly filmRepository: Repository<Film>,
    @InjectQueue(PROCESSORS.film)
    private readonly filmQueue: Queue,
  ) {}

  async createFilm(createFilmDto: CreateFilmDto): Promise<Film> {
    if (await this.filmRepository.findOneBy({ title: createFilmDto.title })) {
      throw new HttpException('Film already exists!', HttpStatus.CONFLICT);
    }
    const createdFilm = await this.filmRepository.save(this.filmRepository.create(createFilmDto));
    await this.filmQueue.add(FILM_PROCESSES.create_film, createdFilm, {
      removeOnComplete: false,
    });

    return createdFilm;
  }

  async getAll(): Promise<Film[]> {
    return await this.filmRepository.find();
  }

  async getOne(id: Film['id']): Promise<Film> {
    const foundFilm = await this.filmRepository.findOneBy({ id });
    if (!foundFilm) {
      throw new HttpException('Film is not found!', HttpStatus.NOT_FOUND);
    }
    return foundFilm;
  }

  async update(id: Film['id'], updateFilmDto: UpdateFilmDto): Promise<UpdateResult> {
    const updateResult = await this.filmRepository.update(id, updateFilmDto);
    if (updateResult.affected === 0) {
      throw new HttpException('Film is not found!', HttpStatus.NOT_FOUND);
    }
    await this.filmQueue.add(FILM_PROCESSES.update_film, updateFilmDto, {
      removeOnComplete: false,
    });

    return updateResult;
  }

  async delete(id: Film['id']): Promise<Film> {
    const filmToDelete = await this.filmRepository.findOneBy({ id });
    if (!filmToDelete) {
      throw new HttpException('Film is not found!', HttpStatus.NOT_FOUND);
    }
    const deletedFilm = await this.filmRepository.remove(filmToDelete);
    await this.filmQueue.add(FILM_PROCESSES.delete_film, deletedFilm, {
      removeOnComplete: false,
    });

    return deletedFilm;
  }
}
