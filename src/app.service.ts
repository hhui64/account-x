import { Injectable } from '@nestjs/common'
import { ConfigService } from './modules/config/config.service'
import { ConfigFromDatabaseService } from './modules/config/config-from-database.service'

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService, private readonly configFromDatabase: ConfigFromDatabaseService) {}

  async getServerInfo(): Promise<object> {
    return {
      meta: {
        serverName: this.config.get('SERVER_NAME') || (await this.configFromDatabase.get('serverName')),
        implementationName: this.config.get('IMPLEMENTATION_NAME'),
        implementationVersion: this.config.get('IMPLEMENTATION_VERSION'),
      },
      skinDomains: [],
      signaturePublickey: this.config.get('SIGNATURE_PUBLICKEY') || await this.configFromDatabase.get('signaturePublickey'),
    }
  }
}
