import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class SessionserverService {
  constructor(@Inject('CACHE_MANAGER') protected readonly cacheManager: any) {}

  async join(req: Request): Promise<any> {
    const key = req.body.serverId
    if (true) {
      const value = {
        serverId: req.body.serverId,
        accessToken: req.body.accessToken,
        ip: req.ip,
      }
      const args = [key, value, { ttl: 30 }]
      await this.cacheManager.set(...args)
    }
    return {}
  }

  async hasJoined(req: Request): Promise<any> {
    const key = req.query.serverId
    const [serverId, username, ip] = [req.query.serverId, req.query.username, req.query.ip]
    const value = await this.cacheManager.get(key)
    if (value) {
      if (serverId === key && username) {
        return {
          text: 'hello world!',
        }
      }
    }
    throw new HttpException(null, HttpStatus.NO_CONTENT)
  }
}
