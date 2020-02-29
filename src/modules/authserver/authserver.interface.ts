import { IsEmail, IsNotEmpty, Length, IsBoolean } from 'class-validator'

class AuthenticateRequest {
  /**
   * 登录邮箱
   */
  @IsEmail()
  @Length(5, 64)
  public readonly username: string

  /**
   * 登录密码
   */
  @IsNotEmpty()
  @Length(1, 32)
  public readonly password: string

  /**
   * 由客户端指定的令牌的 clientToken（可选）
   * - 如客户端未提供则由服务端生成
   */
  public clientToken?: string

  /**
   * 是否在响应中包含用户信息
   * - 默认: false
   */
  @IsBoolean()
  public readonly requestUser: boolean

  /**
   * 附加内容
   */
  public readonly agent?: {
    readonly name?: string
    readonly version?: number
  }
}

class AuthenticateResponse {
  accessToken: string
  clientToken: string
  availableProfiles: Profile[]
  selectedProfile: Profile
  user?: User
}

class RefreshRequest {
  public readonly accessToken: string
  public readonly clientToken?: string
  public readonly requestUser: boolean
  public readonly selectedProfile: Profile
}

class RefreshResponse {
  accessToken: string
  clientToken?: string
  selectedProfile?: Profile
  user: User
}

class ValidateRequest {
  public readonly accessToken: string
  public readonly clientToken?: string
}

class InvalidateRequest {
  public readonly accessToken: string
  public readonly clientToken?: string
}

class SignoutRequest {
  public readonly username: string
  public readonly password: string
}

/**
 * 用户信息的序列化
 */
class User {
  public id: string
  public properties: Properties[]
}

/**
 * 角色信息的序列化
 */
class Profile {
  public id: string
  public name: string
  public properties: Properties[]
}

/**
 * 属性
 */
class Properties {
  public name: string
  public value: string
  public signature?: string
}

export {
  AuthenticateRequest,
  AuthenticateResponse,
  RefreshRequest,
  RefreshResponse,
  ValidateRequest,
  InvalidateRequest,
  SignoutRequest,
  User,
  Profile,
  Properties,
}
