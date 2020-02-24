import { Injectable } from '@nestjs/common'
import { ConfigService } from './modules/config/config.service'

@Injectable()
export class AppService {
  serverName: string
  implementationName: string
  implementationVersion: string
  skinDomains: string[]
  signaturePublickey: string

  constructor(config: ConfigService) {
    this.implementationName = config.get('IMPLEMENTATION_NAME')
    this.implementationVersion = config.get('IMPLEMENTATION_VERSION')
  }

  getServerInfo(): object {
    return {
      meta: {
        serverName: 'Account X',
        implementationName: this.implementationName,
        implementationVersion: this.implementationVersion,
      },
      skinDomains: [],
      signaturePublickey: '',
    }
  }
}
