import { Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as Joi from '@hapi/joi'
import * as fs from 'fs'

export type EnvConfig = Record<string, string>

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath))
    this.envConfig = this.validateInput(config)
  }

  get(key: string): string {
    return this.envConfig[key]
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      IMPLEMENTATION_NAME: Joi.string().default('yggdrasil-mock-server'),
      IMPLEMENTATION_VERSION: Joi.string().default('0.0.1-SNAPSHOT-e60f4d5'),
    })
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig)
    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }
    return validatedEnvConfig
  }
}
