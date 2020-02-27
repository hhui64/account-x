import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Connection } from 'typeorm'
import { User } from '../../entities/user.entity'
import {
  AuthenticateDto,
  AuthenticateResponseDto,
  RefreshDto,
  ValidateDto,
  InvalidateDto,
  SignoutDto,
} from './authserver.interface'
import { YggdrasilHttpException, YggdrasilHttpStatus, YggdrasilUUID } from '../common/static/yggdrasil.static'
import { CommonService } from '../common/common.service'

const data: AuthenticateResponseDto = {
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

  authenticate(authenticateDto: AuthenticateDto): AuthenticateResponseDto {
    data.accessToken = new YggdrasilUUID().getRandomUUID()
    data.clientToken = authenticateDto.clientToken || new YggdrasilUUID().getRandomUUID()
    data.user.id = new YggdrasilUUID().getRandomUUID()

    console.log(data)
    // console.log(new YggdrasilUUID('hhui64').getOfflineUUID())
    // throw new YggdrasilHttpException(
    //   YggdrasilHttpStatus.FORBIDDEN_OPERATION_EXCEPTION,
    //   'ForbiddenOperationException',
    //   'Invalid credentials.',
    //   '',
    // )

    return data
  }

  refresh(refreshDto: RefreshDto) {
    return
  }

  validate(validateDto: ValidateDto) {
    return
  }

  invalidate(invalidateDto: InvalidateDto) {
    return
  }

  signout(signoutDto: SignoutDto) {
    return
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
