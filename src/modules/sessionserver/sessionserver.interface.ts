interface JoinRequest {
  accessToken: string
  selectedProfile: string
  serverId: string
}

interface JoinRequestCache {
  serverId: string
  accessToken: string
  ip?: string
}

interface HasJoinedRequest {
  username: string
  serverId: string
  ip?: string
}

export { JoinRequest, JoinRequestCache, HasJoinedRequest }