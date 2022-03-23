/* eslint-disable @typescript-eslint/no-empty-function */
import { DataSource } from 'typeorm';
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
  entities: [User],
  subscribers: [],
  migrations: [],
});
