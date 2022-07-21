import { DataSourceOptions } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
console.log('NODE_ENV: ', env);
const dotenv_path = path.resolve(process.cwd(), `.env.${env}`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  console.log(`Could not load ${dotenv_path} variables!!!`);
}

const dataSourceOptions: DataSourceOptions = {
  name: 'postgres',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  subscribers: [],
  synchronize: false,
  migrationsRun: true,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  logging: ['error', 'warn', 'info', 'query', 'migration'],
  logger: env === 'production' ? 'file' : 'debug',
  logNotifications: true,
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export default dataSourceOptions;
