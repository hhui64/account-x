import { IsEmail, IsNotEmpty, Length, IsBoolean } from 'class-validator'

class AuthenticateRequest {
  /**
   * 登录邮箱
   */
  @IsEmail()
  @Length(5, 64)
  readonly username: string

  /**
   * 登录密码
   */
  @IsNotEmpty()
  @Length(1, 32)
  readonly password: string

  /**
   * 由客户端指定的令牌的 clientToken（可选）
   * - 如未提供则由服务端生成
   */
  readonly clientToken?: string

  /**
   * 是否在响应中包含用户信息
   * - 默认: false
   */
  @IsBoolean()
  readonly requestUser: boolean

  /**
   * 附加内容
   */
  readonly agent?: {
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
  readonly accessToken: string
  readonly clientToken?: string
  readonly requestUser: boolean
  readonly selectedProfile: Profile
}

class RefreshResponse {
  accessToken: string
  clientToken?: string
  selectedProfile?: Profile
  user: User
}

class ValidateRequest {
  readonly accessToken: string
  readonly clientToken?: string
}

class InvalidateRequest {
  readonly accessToken: string
  readonly clientToken?: string
}

class SignoutRequest {
  readonly username: string
  readonly password: string
}

/**
 * 用户信息的序列化
 */
class User {
  id: string
  properties: Properties[]
}

/**
 * 角色信息的序列化
 */
class Profile {
  id: string
  name: string
  properties: Properties[]
}

/**
 * 属性
 */
class Properties {
  name: string
  value: string
  signature?: string
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
