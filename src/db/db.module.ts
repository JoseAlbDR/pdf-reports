import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/lib/config/config.module';
import { AppConfigService } from 'src/lib/config/config.service';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (config: AppConfigService) => ({
        type: 'postgres',
        host: config.root.dbHost || 'localhost',
        username: config.root.dbUsername || 'postgres',
        password: config.root.dbPasswrod || 'postgres',
        database: config.root.dbName || 'postgres',
        port: config.root.dbPort || 5432,
        autoLoadEntities: true,
        synchronize: true,
        ssl: false,
      }),
      inject: [AppConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
