import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Profile {
  /**
   * 角色 UUID（无符号）
   */
  @PrimaryColumn({
    type: 'varchar',
    length: 64,
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
}
