import { HttpException } from '@nestjs/common'
import { createHash } from 'crypto'
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid'

enum YggdrasilHttpStatus {
  NO_CONTENT = 204,
  ILLEGAL_ARGUMENT_EXCEPTION = 400,
  FORBIDDEN_OPERATION_EXCEPTION = 403,
}

class YggdrasilHttpException extends HttpException {
  constructor(statusCode?: number, error?: string, errorMessage?: string, cause?: string) {
    super(
      {
        error: error || YggdrasilHttpStatus[statusCode],
        errorMessage,
        cause,
      },
      statusCode || 200,
    )
  }
}

/**
 * Yggdrasi 服务端 UUID 类
 */
class YggdrasilUUID {
  constructor(readonly username?: string) {}

  /**
   * 获取随机 UUID 字符串 (v4)
   * @param isSplit 是否返回带分隔符的标准 UUID 字符串
   * @returns 32 位 UUID 字符串
   */
  getRandomUUID(isSplit?: boolean): string {
    const uuid: string = uuidv4()
    return isSplit ? uuid : uuid.split('-').join('')
  }

  /**
   * 获取 Minecraft 离线 UUID (md5)
   * @param isSplit 是否返回带分隔符的标准 UUID 字符串
   * @returns 32 位 UUID 字符串
   */
  getOfflineUUID(isSplit?: boolean): string {
    const uuid: string = createHash('md5')
      .update(`OfflinePlayer:${this.username}`)
      .digest('hex')
    return isSplit ? `${uuid.substring(0, 8)}-${uuid.substring(8, 12)}-${uuid.substring(12, 16)}-${uuid.substring(16, 20)}-${uuid.substring(20, 32)}` : uuid
  }

  getOnlineUUID(): string {
    return ''
  }
}

export { YggdrasilHttpException, YggdrasilHttpStatus, YggdrasilUUID }
