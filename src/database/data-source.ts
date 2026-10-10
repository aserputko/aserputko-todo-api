import { existsSync } from 'node:fs';
import { DataSource } from 'typeorm';
import { getDataSourceOptions } from './database.config.js';

// Entry point for the TypeORM CLI (migrations); the Nest app uses DatabaseModule.
if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

export default new DataSource(getDataSourceOptions());
