import { Injectable } from '@nestjs/common'

@Injectable()
export class CommonService {
  info(): string {
    return 'hello this is a global module!'
  }
}
