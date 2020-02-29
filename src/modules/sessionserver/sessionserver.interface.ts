class JoinRequest {
  readonly accessToken: string
  readonly selectedProfile: string
  readonly serverId: string
}

class JoinRequestCache {
  serverId: string
  accessToken: string
  ip?: string
}

class HasJoinedRequest {
  readonly username: string
  readonly serverId: string
  readonly ip?: string
}

export { JoinRequest, JoinRequestCache, HasJoinedRequest }