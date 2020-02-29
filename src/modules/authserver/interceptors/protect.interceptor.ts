import { CacheInterceptor, ExecutionContext, Injectable, CallHandler } from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { response } from 'express'

@Injectable()
export class ProtectInterceptor extends CacheInterceptor {
  /**
   * 拦截 request 获取内容写入缓存
   * @param context
   * @param next
   */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()
    return next.handle()
  }

  /**
   * 重写 trackBy 方法
   * @param context
   */
  trackBy(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest()
    const key = request.ip
    return key
  }
}
