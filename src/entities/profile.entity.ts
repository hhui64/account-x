import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm'
import { User } from './user.entity'
import { Texture } from './texture.entity'

@Entity()
export class Profile {
  /**
   * 角色 UUID（无符号）
   * - 该键为主键且值为唯一值
   * - 该键的值应调用 `YggdrasilUUID.getOfflineUUID()` 生成
   */
  @PrimaryColumn({
    type: 'varchar',
    length: 64,
    unique: true,
  })
  id: string

  /**
   * 角色名称
   */
  @Column({
    type: 'varchar',
    length: 32,
    unique: true,
  })
  name: string

  /**
   * 创建该角色的用户 ID（无符号）
   * - 对应 `User.id`
   */
  @Column({
    type: 'varchar',
    length: 64,
  })
  userId: string

  /**
   * 当前选中的材质属性的 UUID
   * - 对应 `Texture.uuid`
   */
  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  selectedTexture: string

  /**
   * 创建该角色的用户
   * - 多对一关系
   */
  @ManyToOne(
    type => User,
    user => user.availableProfiles,
  )
  user: User

  /**
   * 用户可用角色列表
   * - 一对多关系
   */
  @OneToMany(
    type => Texture,
    texture => texture.profile,
  )
  textures: Texture[]
}
