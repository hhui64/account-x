import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommonModule } from '../common/common.module'
import { AuthserverController } from './authserver.controller'
import { AuthserverService } from './authserver.service'
import { User } from '../../entities/user.entity'

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  controllers: [AuthserverController],
  providers: [AuthserverService],
})
export class AuthserverModule {}
