import { Module } from '@nestjs/common'
import { SessionserverController } from './sessionserver.controller'
import { SessionserverService } from './sessionserver.service'

@Module({
  imports: [],
  controllers: [SessionserverController],
  providers: [SessionserverService],
})
export class SessionserverModule {}
