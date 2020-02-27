import {
  Controller,
  HttpStatus,
  HttpException,
  Body,
  Post,
  Get,
  UseInterceptors,
  Query,
  HttpCode,
  Req,
  Inject,
} from '@nestjs/common'
import { Request } from 'express'
import { SessionserverService } from './sessionserver.service'
// import { JoinCacheInterceptor } from './interceptors/join-cache.interceptor'

@Controller('sessionserver')
export class SessionserverController {
  constructor(
    private readonly sessionserverService: SessionserverService,
    @Inject('CACHE_MANAGER') protected readonly cacheManager: any,
  ) {}

  @Post('/session/minecraft/join')
  @HttpCode(HttpStatus.NO_CONTENT)
  // @UseInterceptors(JoinCacheInterceptor)
  async join(@Req() req: Request): Promise<object> {
    return await this.sessionserverService.join(req)
  }

  @Get('/session/minecraft/hasJoined')
  // @UseInterceptors(JoinCacheInterceptor)
  async hasJoined(@Req() req: Request): Promise<object> {
    return await this.sessionserverService.hasJoined(req)
  }

  @Get('/session/minecraft/profile/:uuid')
  profile(@Req() req: Request): object {
    return {}
  }
}
