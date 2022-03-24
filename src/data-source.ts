/* eslint-disable @typescript-eslint/no-empty-function */
import { DataSource } from 'typeorm';
import { Quote } from './quotes/quote.entity';
import { User } from './users/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [User, Quote],
  subscribers: [],
  migrations: [],
});
