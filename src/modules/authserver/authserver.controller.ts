import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  HttpStatus,
  HttpException
} from '@nestjs/common'
import { Request, Response } from 'express'
import { CommonService } from '../common/common.service'
import { AuthserverService } from './authserver.service'
import {
  AuthenticateDto,
  AuthenticateResponseDto,
  RefreshDto,
  ValidateDto,
  InvalidateDto,
  SignoutDto,
} from './authserver.interface'

@Controller('authserver')
export class AuthserverController {
  constructor(
    private readonly authserverService: AuthserverService,
    private readonly commonService: CommonService,
  ) {
    // console.log(commonService)
  }

  /**
   * authenticate 登录
   * 使用邮箱和密码进行身份验证，并分配一个新的令牌。
   */
  @Post('/authenticate')
  authenticate(
    @Body() authenticateDto: AuthenticateDto,
  ): AuthenticateResponseDto {
    return this.authserverService.authenticate(authenticateDto)
  }

  /**
   * refresh 刷新
   * 吊销原令牌，并颁发一个新的令牌。
   */
  @Post('/refresh')
  refresh(@Body() refreshDto: RefreshDto): void {
    console.log(refreshDto.requestUser)
    return
  }

  /**
   * validate 验证
   * 验证指定令牌是否有效。
   */
  @Post('/validate')
  validate(@Body() validateDto: ValidateDto): void {
    return
  }

  /**
   * invalidate 吊销
   * 将指定令牌吊销。
   */
  @Post('/invalidate')
  invalidate(@Body() invalidateDto: InvalidateDto): void {
    return
  }

  /**
   * signout 登出
   * 吊销用户的所有令牌。
   */
  @Post('/signout')
  signout(@Body() signoutDto: SignoutDto): void {
    return
  }

  @Get('/find-all')
  async findAll() {
    return await this.authserverService.findAll()
  }

  @Post('/i')
  async i(@Body() body) {
    return await this.authserverService.i(body)
  }
}
