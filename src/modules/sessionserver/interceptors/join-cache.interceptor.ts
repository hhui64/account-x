import { CacheInterceptor, ExecutionContext, Injectable, CallHandler } from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { response } from 'express'

@Injectable()
export class JoinCacheInterceptor extends CacheInterceptor {
  /**
   * 拦截 request 获取内容写入缓存
   * @param context
   * @param next
   */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()
    const lastPath: string = request.route.path.split('/').pop()
    const key = this.trackBy(context)

    console.log(key, lastPath)

    if (!key || !lastPath) {
      return next.handle()
    }

    if (lastPath === 'join') {
      // 等待控制层处理完毕并且不抛出异常时，将控制层返回的内容写入缓存
      return next.handle().pipe(
        tap(response => {
          const value = response
          const args = [key, value, { ttl: 30 }]
          this.cacheManager.set(...args)
        }),
      )
    } else if (lastPath === 'hasJoined') {
      try {
        const value = await this.cacheManager.get(key)

        if (value) {
          // request.cache =

          //return next.handle()
          return of(value)
        }

        // return next.handle().pipe(
        //   tap(response => {
        //     console.log(response)
        //   }),
        // )
      } catch (error) {
        return next.handle()
      }
    } else {
      return next.handle()
    }
  }

  /**
   * 重写 trackBy 方法
   * 从 request 中获取 serverId 作为缓存的 key
   * @param context
   */
  trackBy(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest()
    const lastPath: string = request.route.path.split('/').pop()
    let key = ''
    switch (lastPath) {
      case 'join':
        key = request.body.serverId
        break
      case 'hasJoined':
        key = request.query.serverId
        break
    }
    return key
  }
}
