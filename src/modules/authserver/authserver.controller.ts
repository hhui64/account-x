import { Controller, Get, Post, Req, Res, Body, HttpStatus, HttpException, HttpCode } from '@nestjs/common'
import { Request, Response } from 'express'
import { CommonService } from '../common/common.service'
import { AuthserverService } from './authserver.service'
import {
  AuthenticateRequest,
  AuthenticateResponse,
  RefreshRequest,
  ValidateRequest,
  InvalidateRequest,
  SignoutRequest,
} from './authserver.interface'

@Controller('authserver')
export class AuthserverController {
  constructor(private readonly authserverService: AuthserverService, private readonly commonService: CommonService) {}

  /**
   * authenticate 登录
   * - 使用邮箱和密码进行身份验证，并分配一个新的令牌。
   */
  @Post('/authenticate')
  async authenticate(@Body() authenticateRequest: AuthenticateRequest): Promise<AuthenticateResponse> {
    return await this.authserverService.authenticate(authenticateRequest)
  }

  /**
   * refresh 刷新
   * - 吊销原令牌，并颁发一个新的令牌。
   */
  @Post('/refresh')
  async refresh(@Body() refreshRequest: RefreshRequest): Promise<object> {
    return this.authserverService.refresh(refreshRequest)
  }

  /**
   * validate 验证
   * - 验证指定令牌是否有效。
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/validate')
  async validate(@Body() validateRequest: ValidateRequest): Promise<object> {
    return await this.authserverService.validate(validateRequest)
  }

  /**
   * invalidate 吊销
   * - 将指定令牌吊销。
   */
  @Post('/invalidate')
  @HttpCode(HttpStatus.NO_CONTENT)
  async invalidate(@Body() invalidateRequest: InvalidateRequest): Promise<object> {
    return await this.authserverService.invalidate(invalidateRequest)
  }

  /**
   * signout 登出
   * - 吊销用户的所有令牌。
   */
  @Post('/signout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async signout(@Body() signoutRequest: SignoutRequest): Promise<object> {
    return await this.authserverService.signout(signoutRequest)
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
