import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Config } from 'src/entities/config.entity'

@Injectable()
export class ConfigFromDatabaseService {
  constructor(@InjectRepository(Config) private readonly ConfigRepository: Repository<Config>) {}

  async get(key: string): Promise<string> {
    const result: Config = await this.ConfigRepository.findOne({ where: { key } })
    return result ? (result.value || '') : ''
  }
}
