import { Process, Processor } from '@nestjs/bull';
import { Logger, Scope } from '@nestjs/common';
import { Job } from 'bull';
import { FILM_PROCESSES, PROCESSORS } from './film.constants';

@Processor({ name: PROCESSORS.film, scope: Scope.DEFAULT })
export class FilmProcessor {
  private readonly logger = new Logger(FilmProcessor.name);

  @Process(FILM_PROCESSES.create_film)
  handleCreateFilm(job: Job): void {
    this.logger.debug('Start processing "handleCreateFilm"');
    // Here to trigger an AWS lambda function
    this.logger.debug(JSON.stringify(job.data));
    this.logger.debug('Finish processing "handleCreateFilm"');
  }

  @Process(FILM_PROCESSES.update_film)
  handleUpdateFilm(job: Job): number {
    this.logger.debug('Start processing "handleUpdateFilm"');
    // Here to trigger an AWS lambda function
    this.logger.debug(JSON.stringify(job.data));
    this.logger.debug('Finish processing "handleUpdateFilm"');
    return 42;
  }

  @Process(FILM_PROCESSES.delete_film)
  handleDeleteFilm(job: Job) {
    this.logger.debug('Start processing "handleDeleteFilm"');
    // Here to trigger an AWS lambda function
    this.logger.debug(JSON.stringify(job.data));
    this.logger.debug('Finish processing "handleDeleteFilm"');
  }
}
