class JoinRequest {
  public readonly accessToken: string
  public readonly selectedProfile: string
  public readonly serverId: string
}

class JoinRequestCache {
  public serverId: string
  public accessToken: string
  public ip?: string
}

class HasJoinedRequest {
  public readonly username: string
  public readonly serverId: string
  public readonly ip?: string
}

export { JoinRequest, JoinRequestCache, HasJoinedRequest }