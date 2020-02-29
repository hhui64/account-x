import { HttpException } from '@nestjs/common'
import { createHash } from 'crypto'
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid'
import { PNG } from 'pngjs'
import * as fs from 'fs'

enum YggdrasilHttpStatus {
  ILLEGAL_ARGUMENT_EXCEPTION = 400,
  FORBIDDEN_OPERATION_EXCEPTION = 403,
}

const YggdrasilHttpErrorStatus = {
  400: 'IllegalArgumentException',
  403: 'ForbiddenOperationException',
}

/**
 * Yggdrasi 服务端异常类
 */
class YggdrasilHttpException extends HttpException {
  constructor(errorMessage?: string, statusCode?: number, error?: string, cause?: string) {
    super(
      {
        error: error || YggdrasilHttpErrorStatus[statusCode],
        errorMessage,
        cause: cause || '',
      },
      statusCode || 204,
    )
  }
}

/**
 * Yggdrasi 服务端 UUID 类
 */
class YggdrasilUUID {
  /**
   * 获取随机 UUID 字符串 (v4)
   * @param namespace 用做生成的命名空间
   * @param isSplit 是否返回带分隔符的标准 UUID 字符串
   * @returns 32 位 UUID 字符串
   */
  public getRandomUUID(namespace?: string, isSplit?: boolean): string {
    const uuid: string = uuidv4()
    return isSplit ? uuid : uuid.split('-').join('')
  }

  /**
   * 获取 Minecraft 离线 UUID (md5)
   * @param name 角色名称
   * @param isSplit 是否返回带分隔符的标准 UUID 字符串
   * @returns 32 位 UUID 字符串
   */
  public getOfflineUUID(name: string, isSplit?: boolean): string {
    const uuid: string = createHash('md5')
      .update(`OfflinePlayer:${name}`)
      .digest('hex')
    return isSplit
      ? `${uuid.substring(0, 8)}-${uuid.substring(8, 12)}-${uuid.substring(12, 16)}-${uuid.substring(
          16,
          20,
        )}-${uuid.substring(20, 32)}`
      : uuid
  }

  /**
   * TODO: 获取 Minecraft 在线 UUID
   * @param name 角色名称
   * @param isSplit 是否返回带分隔符的标准 UUID 字符串
   * @returns 32 位 UUID 字符串
   */
  public getOnlineUUID(name: string, isSplit?: boolean): string {
    return ''
  }
}

/**
 * Yggdrasi 材质处理类
 */
class YggdrasilTexture {
  /**
   * 图片 Buffer 计算 HASH
   * @param imageFile 图片文件 Buffer
   * @return 长度为 64 位的 HEX 字符串
   */
  public computeTextureHash(imageFile: Buffer): string {
    const image = PNG.sync.read(imageFile)
    const bufSize = 8192
    const hash = createHash('sha256')
    const buf = Buffer.allocUnsafe(bufSize)
    const width = image.width
    const height = image.height
    buf.writeUInt32BE(width, 0)
    buf.writeUInt32BE(height, 4)
    let pos = 8
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const imgidx = (width * y + x) << 2
        const alpha = image.data[imgidx + 3]
        buf.writeUInt8(alpha, pos + 0)
        if (alpha === 0) {
          buf.writeUInt8(0, pos + 1)
          buf.writeUInt8(0, pos + 2)
          buf.writeUInt8(0, pos + 3)
        } else {
          buf.writeUInt8(image.data[imgidx + 0], pos + 1)
          buf.writeUInt8(image.data[imgidx + 1], pos + 2)
          buf.writeUInt8(image.data[imgidx + 2], pos + 3)
        }
        pos += 4
        if (pos === bufSize) {
          pos = 0
          hash.update(buf)
        }
      }
    }
    if (pos > 0) {
      hash.update(buf.slice(0, pos))
    }
    return hash.digest('hex')
  }

  /**
   * 判断图片宽高是否合法
   * - 皮肤的宽高为 64x32 的整数倍或 64x64 的整数倍
   * - 披风的宽高为 64x32 的整数倍或 22x17 的整数倍
   * @param width 宽
   * @param height 高
   * @returns 布尔型判断结果
   */
  public checkImageSize(width: number, height: number): boolean {
    return (
      ((width * height) % (64 * 64) === 0 && width === height) ||
      ((width * height) % (64 * 32) === 0 && width / height === 2)
    )
  }
}

export { YggdrasilHttpException, YggdrasilHttpStatus, YggdrasilUUID, YggdrasilTexture }
