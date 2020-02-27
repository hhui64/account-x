import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common'
import { Request } from 'express'
import { Profile } from '../authserver/authserver.interface'
import { JoinRequest, JoinRequestCache, HasJoinedRequest } from './sessionserver.interface'

@Injectable()
export class SessionserverService {
  constructor(@Inject('CACHE_MANAGER') protected readonly cacheManager: any) {}

  async join(req: Request): Promise<object> {
    const joinRequest: JoinRequest = req.body
    const key = joinRequest.serverId
    if (true) {
      const value: JoinRequestCache = {
        serverId: joinRequest.serverId,
        accessToken: joinRequest.accessToken,
        ip: req.ip,
      }
      const args = [key, value, { ttl: 30 }]
      await this.cacheManager.set(...args)
    }
    return {}
  }

  async hasJoined(req: Request): Promise<Profile> {
    const hasJoinedRequest: HasJoinedRequest = req.query
    const key = hasJoinedRequest.serverId
    const [serverId, username, ip] = [hasJoinedRequest.serverId, hasJoinedRequest.username, hasJoinedRequest.ip]
    const value = await this.cacheManager.get(key)
    if (value) {
      if (serverId === key && username) {
        return {
          id: '',
          name: '',
          properties: [],
        }
      }
    }
    throw new HttpException(null, HttpStatus.NO_CONTENT)
  }
}
