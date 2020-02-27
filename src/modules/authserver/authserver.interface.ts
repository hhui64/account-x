interface AuthenticateRequest {
  username: string
  password: string
  clientToken?: string
  requestUser: boolean
  agent: {
    name: string
    version: number
  }
}

interface AuthenticateResponse {
  accessToken: string
  clientToken: string
  availableProfiles: Profile[]
  selectedProfile: Profile
  user?: User
}

interface RefreshRequest {
  accessToken: string
  clientToken?: string
  requestUser: boolean
  selectedProfile: Profile
}

interface RefreshResponse {
  accessToken: string
  clientToken?: string
  selectedProfile?: Profile
  user: User
}

interface ValidateRequest {
  accessToken: string
  clientToken?: string
}

interface InvalidateRequest {
  accessToken: string
  clientToken?: string
}

interface SignoutRequest {
  username: string
  password: string
}

/**
 * 用户信息的序列化
 */
interface User {
  id: string
  properties: Properties[]
}

/**
 * 角色信息的序列化
 */
interface Profile {
  id: string
  name: string
  properties: Properties[]
}

/**
 * 属性
 */
interface Properties {
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
