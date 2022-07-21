import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import { PROVIDERS, REPOS } from '../database/database.constants';

export const userProvider = [
  {
    provide: REPOS.user_repository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [PROVIDERS.data_source],
  },
];
