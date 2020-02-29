import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommonModule } from '../common/common.module'
import { AuthserverController } from './authserver.controller'
import { AuthserverService } from './authserver.service'
import { User } from 'src/entities/user.entity'
import { Profile } from 'src/entities/profile.entity'
import { Texture } from 'src/entities/texture.entity'
import { Skin } from 'src/entities/skin.entity'
import { Cape } from 'src/entities/cape.entity'

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([User, Profile, Texture, Skin, Cape])],
  controllers: [AuthserverController],
  providers: [AuthserverService],
  exports: [TypeOrmModule],
})
export class AuthserverModule {}
