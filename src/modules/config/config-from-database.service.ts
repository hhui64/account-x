import { Injectable } from '@nestjs/common'
import { Connection } from 'typeorm'
import { Config } from 'src/entities/config.entity'

@Injectable()
export class ConfigFromDatabaseService {
  constructor(private readonly connection: Connection) {}

  async get(key: string): Promise<string> {
    const result: Config = await this.connection.manager.findOne(Config, { where: { key } })
    return result ? result.value : ''
  }

  async set(key: string, value: string): Promise<Config> {
    const config = new Config()
    config.key = key
    config.value = value
    const result: Config = await this.connection.manager.save(config)
    return result
  }
}
