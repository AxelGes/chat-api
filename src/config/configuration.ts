import { AppConfiguration, AppEnvironment, PostgresConfiguration } from './configuration.interface';

/**
 * Configuration docs
 * https://docs.nestjs.com/techniques/configuration
 */
export default () => {
  const app: AppConfiguration = {
    env: process.env.NODE_ENV as AppEnvironment,
    port: parseInt(process.env.APP_PORT || '3000'),
  };

  const postgres: PostgresConfiguration = {
    name: process.env.POSTGRES_DB_NAME,
    host: process.env.POSTGRES_DB_HOST,
    port: parseInt(process.env.POSTGRES_DB_PORT || '5432'),
    user: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
  };

  return { app, postgres };
};
