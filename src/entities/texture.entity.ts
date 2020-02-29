import { Entity, Column, PrimaryColumn, Generated, ManyToOne } from 'typeorm'
import { Profile } from './profile.entity'

@Entity()
export class Texture {
  /**
   * 材质属性 UUID
   * - 该键为主键且值为唯一值
   * - 该键的值是插入时自动生成的
   */
  @PrimaryColumn({
    type: 'varchar',
    length: 64,
    unique: true,
  })
  @Generated('uuid')
  uuid: string

  /**
   * 该属性值被生成时的时间戳
   * - 格式为 Java 时间戳格式，即自 `1970-01-01 00:00:00 UTC` 至今经过的毫秒数
   */
  @Column({
    type: 'varchar',
    length: 13,
  })
  timestamp: string

  /**
   * 角色 UUID（无符号）
   * - 对应 `Profile.id`
   */
  @Column({
    type: 'varchar',
    length: 64,
  })
  profileId: string

  /**
   * 角色名称
   * - 对应 `Profile.name`
   */
  @Column({
    type: 'varchar',
    length: 32,
  })
  profileName: string

  /**
   * 角色选中的皮肤材质 UUID
   * - 对应 `Skin.uuid`
   */
  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  selectedSkin: string

  /**
   * 角色选中的披风材质 UUID
   * - 对应 `Cape.uuid`
   */
  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  selectedCape: string

  /**
   * 该材质所属的角色
   * - 多对一关系
   */
  @ManyToOne(
    type => Profile,
    profile => profile.textures,
  )
  profile: Profile
}
