import { DataSource } from 'typeorm';
import { Film } from '../../entities/film.entity';
import { PROVIDERS, REPOS } from '../database/database.constants';

export const filmProvider = [
  {
    provide: REPOS.film_repository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Film),
    inject: [PROVIDERS.data_source],
  },
];
