"use strict";
exports.__esModule = true;
exports.AppDataSource = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
var typeorm_1 = require("typeorm");
var quote_entity_1 = require("./quotes/quote.entity");
var user_entity_1 = require("./users/user.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    logging: true,
    entities: [user_entity_1.User, quote_entity_1.Quote],
    subscribers: [],
    migrations: []
});
