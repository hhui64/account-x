import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
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
    private readonly commonService: CommonService,
    private readonly connection: Connection,
    @InjectRepository(User) private readonly AuthserverRepository: Repository<User>,
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
    return this.AuthserverRepository.find()
  }

  i(body) {
    return this.AuthserverRepository.insert({
      id: null,
      uuid: body.uuid,
      nickname: body.nickname,
    })
  }
}
