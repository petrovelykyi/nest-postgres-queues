import { DataSource } from 'typeorm';
import dataSourceOptions from '../../ormconfig';
import dataSourceOptionsTest from '../../ormconfig.test';

const options = process.env.NODE_ENV === 'test' ? dataSourceOptionsTest : dataSourceOptions;

export default new DataSource(options);
