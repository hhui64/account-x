import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { SessionserverService } from './sessionserver.service'

@Controller('sessionserver')
export class SessionserverController {
  constructor(private readonly sessionserverService: SessionserverService) {}

  @Post('/session/minecraft/join')
  join(@Req() req: Request, @Res() res: Response): void {
    req.body['accessToken']
    req.body['selectedProfile']
    req.body['serverId']
    return
  }

  @Get('/session/minecraft/hasJoined')
  hasJoined(@Req() req: Request, @Res() res: Response): void {
    req.params['username']
    req.params['serverId']
    req.params['ip']
    return
  }

  @Get('/session/minecraft/profile/:uuid')
  profile(@Req() req: Request, @Res() res: Response): void {
    req.params['unsigned']
    return
  }
}
