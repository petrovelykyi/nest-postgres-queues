import { PROVIDERS } from './database.constants';
import dataSource from './dataSource';

export const databaseProviders = [
  {
    provide: PROVIDERS.data_source,
    useFactory: async () => {
      return dataSource.initialize().catch((error) => {
        console.error('Error during Data Source initialization: ', error);
      });
    },
  },
];
