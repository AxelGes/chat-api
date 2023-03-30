import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Message } from '../../modules/message/entities/message.entity';
import { User } from '../../modules/user/entities/user.entity';
import { PostgresConfiguration } from '../configuration.interface';

export const createDataSourceOptions = async (
  configService: ConfigService,
): Promise<DataSourceOptions> => {
  const postgresConfig = configService.get<PostgresConfiguration>('postgres');

  const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: postgresConfig.host,
    port: postgresConfig.port,
    username: postgresConfig.user,
    password: postgresConfig.password,
    database: postgresConfig.name,
    entities: [User, Message],
    migrations: [...join(__dirname, '../../database/migrations/*{.ts,.js}')],
    subscribers: ['src/subscriber/*{.ts,.js}'],
    synchronize: true,
  };

  return dataSourceOptions;
};

export const createDataSource = async (configService: ConfigService): Promise<DataSource> => {
  const dataSourceOptions = await createDataSourceOptions(configService);
  const dataSource = new DataSource(dataSourceOptions);

  return dataSource;
};
