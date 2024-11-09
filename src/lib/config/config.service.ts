import { z } from 'zod';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export enum STAGE {
  PRODUCTION = 'production',
  RC = 'rc',
  STAGING = 'staging',
  LOCAL = 'local',
}

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  public get root() {
    return {
      port: this.port,
      swagger: this.swagger,
      dbHost: this.db.host,
      dbUsername: this.db.username,
      dbPasswrod: this.db.password,
      dbName: this.db.database,
      dbPort: this.db.port,
    };
  }

  public get db() {
    const dbSchema = z.object({
      host: z.string().min(1).max(255),
      username: z.string().min(1).max(255),
      password: z.string().min(8).max(255),
      database: z.string().min(1).max(255),
      port: z.number().int().gt(0).lte(65535),
    });

    const dbConfig = dbSchema.safeParse({
      host: process.env.DB_HOST || this.config.get('DB_HOST') || 'localhost',
      username:
        process.env.POSTGRES_USER ||
        this.config.get('POSTGRES_USER') ||
        'postgres',
      password:
        process.env.POSTGRES_PASSWORD ||
        this.config.get('POSTGRES_PASSWORD') ||
        'postgres',
      database:
        process.env.POSTGRES_DB || this.config.get('POSTGRES_DB') || 'reports',
      port: parseInt(
        process.env.DB_PORT || this.config.get('DB_PORT') || '5432',
      ),
    });

    if (!dbConfig.success) {
      throw new Error(
        `There was an error connecting to DB: ${dbConfig.error.message}`,
      );
    }

    return {
      ...dbConfig.data,
    };
  }

  public get port() {
    const portSchema = z.number().int().gt(0).lte(65535);
    const port = parseInt(
      process.env.PORT || this.config.get('PORT') || '3000',
      10,
    );
    const portValue = portSchema.safeParse(port);
    if (!portValue.success) {
      throw new Error(`PORT value ${port} is not a valid port number`);
    }
    return portValue.data;
  }

  public get swagger() {
    const swaggerSchema = z.object({
      username: z.string().min(1).max(255),

      password: z.string().min(1).max(255),
    });
    const swaggerConfig = swaggerSchema.safeParse({
      username:
        process.env.SWAGGER_USERNAME ||
        this.config.get('SWAGGER_USERNAME') ||
        'swagger',
      password:
        process.env.SWAGGER_PASSWORD ||
        this.config.get('SWAGGER_PASSWORD') ||
        'swagger',
    });
    if (!swaggerConfig.success) {
      throw new Error(
        `SWAGGER_USERNAME and/or SWAGGER_PASSWORD are not valid: ${swaggerConfig.error.message}`,
      );
    }
    return {
      username: swaggerConfig.data.username,
      password: swaggerConfig.data.password,
    };
  }
}
