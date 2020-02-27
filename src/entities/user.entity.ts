import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm'

@Entity()
export class User {
  /**
   * 自增主键 UID
   */
  @PrimaryGeneratedColumn()
  uid: number

  /**
   * 用户的 ID，为一个无符号的 `UUID`
   */
  @Column({
    type: 'varchar',
    length: 64,
  })
  @Generated('uuid')
  id: string

  /**
   * 用户名，用以在网站显示，为空则显示邮箱
   */
  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  username: string

  /**
   * 密码，经过加盐计算后得出的 HEX 字符串
   */
  @Column({
    type: 'varchar',
    length: 512,
  })
  password: string

  /**
   * 盐值，参与密码的 HASH 计算
   */
  @Column({
    type: 'varchar',
    length: 512,
  })
  salt: string

  /**
   * 用户注册时间（自动生成）
   */
  @CreateDateColumn()
  register_time: number

  /**
   * 用户注册 IP 地址
   */
  @Column({
    type: 'varchar',
    length: 11,
    nullable: true,
  })
  register_ip: string

  /**
   * 最后登录的时间
   */
  @Column({
    type: 'datetime',
    nullable: true,
  })
  login_time: Date

  /**
   * 最后登录的 IP 地址
   */
  @Column({
    type: 'varchar',
    length: 11,
    nullable: true,
  })
  login_ip: string

  /**
   * 用户昵称
   */
  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  nickname: string

  /**
   * 性别
   */
  @Column({
    type: 'enum',
    enum: [0, 1, 2],
    default: 0,
  })
  sex: number[]

  /**
   * QQ号码
   */
  @Column({
    type: 'varchar',
    length: 11,
    nullable: true,
  })
  qq: string

  /**
   * 手机号码
   */
  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
  })
  phone: string

  /**
   * 个人简介
   */
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  profile: string
}
