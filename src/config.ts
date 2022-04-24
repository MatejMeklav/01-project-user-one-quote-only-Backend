import { Quote } from './quotes/quote.entity';
import { User } from './users/user.entity';

export const config = () => ({
  database: {
    type: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: true,
    logging: true,
    entities: [User, Quote],
    subscribers: [],
    migrations: [],
    database: process.env.DATABASE_USERNAME,
  },
});
