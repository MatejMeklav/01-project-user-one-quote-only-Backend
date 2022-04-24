import { Quote } from './quotes/quote.entity';
import { User } from './users/user.entity';

export const config = () => ({
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: process.env.DATABASE_PASSWORD,
    synchronize: true,
    logging: true,
    entities: [User, Quote],
    subscribers: [],
    migrations: [],
    database: 'postgres',
  },
});
