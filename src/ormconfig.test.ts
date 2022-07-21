import { DataSourceOptions } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
const dotenv_path = path.resolve(process.cwd(), `.env.${env}`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  console.log(`Could not load ${dotenv_path} variables!!!`);
}

const dataSourceOptionsTest: DataSourceOptions = {
  name: 'test_db',
  type: 'sqlite',
  // database: ':memory:',
  database: 'sqlite.db',
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  subscribers: [],
  synchronize: true,
  migrationsRun: false,
  logging: ['error', 'warn', 'info', 'query', 'migration'],
  logger: env === 'production' ? 'file' : 'debug',
};

export default dataSourceOptionsTest;
