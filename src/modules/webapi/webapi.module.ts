import { Module } from '@nestjs/common'
import { WebapiController } from './webapi.controller'
import { WebapiService } from './webapi.service'

@Module({
  controllers: [WebapiController],
  providers: [WebapiService],
})
export class WebapiModule {}
