import { IsEnum, IsNotEmpty, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

enum NODE_ENV {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(NODE_ENV)
  NODE_ENV: NODE_ENV;

  @IsNotEmpty()
  PORT: number | string;

  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  GOOGLE_SECRET: string;

  @IsString()
  SESSION_SECRET: string;

  @IsString()
  GOOGLE_CALLBACK_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
