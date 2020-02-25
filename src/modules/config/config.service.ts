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
      APP_PORT: Joi.number()
        .port()
        .default(5678),
      SERVER_NAME: Joi.string().empty(''),
      IMPLEMENTATION_NAME: Joi.string(),
      IMPLEMENTATION_VERSION: Joi.string(),
      SIGNATURE_PUBLICKEY: Joi.string().empty(''),
    })

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig)

    if (error) {
      throw new TypeError(`配置文件验证错误: ${error.message}`)
    }

    return validatedEnvConfig
  }
}
