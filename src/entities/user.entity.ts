import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 64,
  })
  @Generated('uuid')
  uuid: string

  @Column({
    type: 'varchar',
    length: 32,
  })
  username: string

  @Column({
    type: 'varchar',
    length: 512,
  })
  password: string

  @Column({
    type: 'varchar',
    length: 512,
  })
  salt: string

  @CreateDateColumn()
  register_time: number

  @Column({
    type: 'varchar',
    length: 11,
    nullable: true,
  })
  register_ip: string

  @Column({
    type: 'datetime',
    nullable: true,
  })
  login_time: Date

  @Column({
    type: 'varchar',
    length: 11,
    nullable: true,
  })
  login_ip: string

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  nickname: string

  @Column({
    type: 'enum',
    enum: [0, 1, 2],
    default: 0,
  })
  sex: number[]

  @Column({
    type: 'varchar',
    length: 11,
    nullable: true,
  })
  qq: string

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
  })
  phone: string

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  profile: string
}
