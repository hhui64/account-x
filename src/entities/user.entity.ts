import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated, OneToMany } from 'typeorm'
import { Profile } from './profile.entity'
import { Skin } from './skin.entity'
import { Cape } from './cape.entity'

@Entity()
export class User {
  /**
   * 自增主键 UID
   */
  @PrimaryGeneratedColumn()
  uid: number

  /**
   * 用户 ID（无符号）
   * - 该键的值为唯一值
   */
  @Column({
    type: 'varchar',
    length: 64,
    unique: true,
  })
  id: string

  /**
   * 用户名（邮箱）
   * - 通常情况下为邮箱，登录（注册）时用户名即为邮箱
   * - 该键的值为唯一值
   */
  @Column({
    type: 'varchar',
    length: 128,
    unique: true,
  })
  username: string

  /**
   * 密码，经过加盐计算后得出的 HEX 字符串
   */
  @Column({
    type: 'varchar',
    length: 128,
  })
  password: string

  /**
   * 盐值，参与密码的 HASH 计算
   */
  @Column({
    type: 'varchar',
    length: 128,
  })
  salt: string

  /**
   * 用户注册时间
   * - 该键的值是插入时自动生成的
   */
  @CreateDateColumn()
  register_time: Date

  /**
   * 用户注册 IP 地址
   */
  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  register_ip: string

  /**
   * 最后登录的时间
   */
  @Column({
    type: 'datetime',
    width: 6,
    nullable: true,
  })
  login_time: Date

  /**
   * 最后登录的 IP 地址
   */
  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  login_ip: string

  /**
   * 用户权限
   * - 0: user, 1: admin, 2: superadmin
   */
  @Column({
    type: 'enum',
    enum: [0, 1, 2],
    default: 0,
  })
  permission: number

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
   * 用户性别
   * - 0: 未知, 1: 男, 2: 女
   */
  @Column({
    type: 'enum',
    enum: [0, 1, 2],
    default: 0,
  })
  sex: number

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
  description: string

  /**
   * 用户当前选中的角色 UUID（无符号）
   * - 对应 `Profile.id`
   */
  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  selectedProfile: string

  /**
   * 用户可用角色列表
   * - 一对多关系
   */
  @OneToMany(
    type => Profile,
    profile => profile.user,
  )
  availableProfiles: Profile[]

  /**
   * 用户上传的皮肤列表
   * - 一对多关系
   */
  @OneToMany(
    type => Skin,
    skin => skin.user,
  )
  skins: Skin[]

  /**
   * 用户上传的披风列表
   * - 一对多关系
   */
  @OneToMany(
    type => Cape,
    cape => cape.user,
  )
  capes: Cape[]
}
