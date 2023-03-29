export enum AppEnvironment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Local = 'local',
}

export interface AppConfiguration {
  env: AppEnvironment;
  port: number;
  secret: string;
}

export interface PostgresConfiguration {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
}
