/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
require('module-alias/register');
const { DataSource } = require('typeorm');

module.exports = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  subscribers: ['dist/src/**/*.subscriber.js'],
});
