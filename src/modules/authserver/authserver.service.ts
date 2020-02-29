import { Injectable, HttpStatus, HttpException, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Connection } from 'typeorm'
import { User } from '../../entities/user.entity'
import {
  AuthenticateRequest,
  AuthenticateResponse,
  RefreshRequest,
  ValidateRequest,
  InvalidateRequest,
  SignoutRequest,
  RefreshResponse,
} from './authserver.interface'
import { YggdrasilHttpException, YggdrasilHttpStatus, YggdrasilUUID } from '../common/static/yggdrasil.static'
import { CommonService } from '../common/common.service'
import { Profile } from 'src/entities/profile.entity'

const data: AuthenticateResponse = {
  accessToken: '',
  clientToken: '',
  availableProfiles: [
    {
      id: '62e1920b49f158fb5adf016d72df2a97',
      name: 'hhui64',
      properties: [],
    },
  ],
  selectedProfile: {
    id: '62e1920b49f158fb5adf016d72df2a97',
    name: 'hhui64',
    properties: [],
  },
  user: {
    id: '',
    properties: [
      {
        name: 'preferredLanguage',
        value: 'zh_CN',
      },
    ],
  },
}

@Injectable()
export class AuthserverService {
  constructor(
    @Inject('CommonService') private readonly commonService: CommonService,
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async authenticate(authenticateRequest: AuthenticateRequest): Promise<AuthenticateResponse> {
    data.accessToken = new YggdrasilUUID().getRandomUUID()
    data.clientToken = authenticateRequest.clientToken || new YggdrasilUUID().getRandomUUID()
    data.user.id = new YggdrasilUUID().getRandomUUID()

    return data
  }

  async refresh(refreshRequest: RefreshRequest): Promise<RefreshResponse> {
    return
  }

  async validate(validateRequest: ValidateRequest): Promise<object> {
    return {}
  }

  async invalidate(invalidateRequest: InvalidateRequest): Promise<object> {
    return {}
  }

  async signout(signoutRequest: SignoutRequest): Promise<object> {
    return {}
  }

  findAll(): Promise<User[]> {
    return this.UserRepository.find()
  }

  async i(body) {

    // const user = new User()
    // user.id = new YggdrasilUUID().getRandomUUID()

    // user.username = body.username
    // user.password = 'aqweqwe'
    // user.salt = 'qweqwe'
    // user.sex = 0
    // user.permission = 0

    // const r1 = await this.connection.manager.save(user)
    const user = await this.connection.manager.findOne(User, {
      where: {
        id: body.id
      }
    })

    const profile = new Profile()

    profile.id = new YggdrasilUUID().getOfflineUUID(body.profileName)
    profile.name = body.profileName
    
    // 根据关系映射自动生成
    profile.userId = user.id
    profile.user = user

    const r2 = await this.connection.manager.save(profile)
    
    // const photo2 = new Photo()
    // photo2.url = 'me-and-bears.jpg'
    // photo2.user = user
    // await this.connection.manager.save(photo2)

    return r2
  }
}
