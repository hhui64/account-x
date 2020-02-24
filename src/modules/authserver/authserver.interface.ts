interface AuthenticateDto {
  username: string
  password: string
  clientToken?: string
  requestUser: boolean
  agent: {
    name: string
    version: number
  }
}

interface AuthenticateResponseDto {
  accessToken: string
  clientToken: string
  availableProfiles: Profile[]
  selectedProfile: Profile
  user?: User
}

interface RefreshDto {
  accessToken: string
  clientToken?: string
  requestUser: boolean
  selectedProfile: Profile
}

// interface RefreshResponseDto {

// }

interface ValidateDto {
  accessToken: string
  clientToken?: string
}

// interface ValidateResponseDto {

// }

interface InvalidateDto {
  accessToken: string
  clientToken?: string
}

// interface InvalidateResponseDto {

// }

interface SignoutDto {
  username: string
  password: string
}

// interface SignoutResponseDto {

// }

interface User {
  id: string
  properties: Properties[]
}

interface Profile {
  id: string
  name: string
  properties: Properties[]
}

interface Properties {
  name: string
  value: string
  signature?: string
}

export {
  AuthenticateDto,
  AuthenticateResponseDto,
  RefreshDto,
  ValidateDto,
  InvalidateDto,
  SignoutDto,
}
