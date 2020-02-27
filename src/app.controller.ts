import { Controller, Get, CacheInterceptor, UseInterceptors } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getServerInfo() {
    return await this.appService.getServerInfo()
  }
}
