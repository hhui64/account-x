import { Controller, Post, Get } from '@nestjs/common'
import { WebapiService } from './webapi.service'

@Controller('webapi')
export class WebapiController {
  constructor(private readonly webapiService: WebapiService) {}
}
