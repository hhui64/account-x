import { Entity, Column, PrimaryColumn, Generated, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Skin {
  /**
   * 皮肤 UUID
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
   * 上传该皮肤的用户 ID（无符号）
   * - 对应 `User.id`
   */
  @Column({
    type: 'varchar',
    length: 64,
  })
  userId: string

  /**
   * 皮肤名称
   */
  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  name: string

  /**
   * 皮肤类型
   * - default: STEVE，slim: ALEX
   */
  @Column({
    type: 'enum',
    enum: ['default', 'slim'],
    default: 'default',
  })
  model: string

  /**
   * 皮肤上传的时间
   * - 该键的值是插入时自动生成的
   */
  @CreateDateColumn()
  upload_time: Date

  /**
   * 披风最后编辑的时间
   * - 该键的值是编辑时自动更新的
   */
  @UpdateDateColumn()
  edit_time: Date

  /**
   * 皮肤描述
   */
  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  description: string

  /**
   * 皮肤 HASH 值
   */
  @Column({
    type: 'varchar',
    length: 128,
  })
  hash: string

  /**
   * 皮肤图片文件名
   */
  @Column({
    type: 'varchar',
    length: 128,
  })
  filename: string

  /**
   * 上传该皮肤的用户
   * - 多对一关系
   */
  @ManyToOne(
    type => User,
    user => user.skins,
  )
  user: User
}
