export interface Image {
  Containers: number
  Created: number
  Id: string
  Labels: any
  ParentId: string
  RepoDigests: string[]
  RepoTags: string[]
  SharedSize: number
  Size: number
  VirtualSize: number
}
