import { Controller, Get, Post, Req, Res, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getServerInfo(@Req() req: Request, @Res() res: Response): void {
    res.status(HttpStatus.OK).json(this.appService.getServerInfo())
  }
}
