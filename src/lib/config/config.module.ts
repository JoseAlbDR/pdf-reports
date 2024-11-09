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

      password: z.string().min(8).max(255),
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
