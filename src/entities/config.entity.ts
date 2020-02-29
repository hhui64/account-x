import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Config {
  /**
   * 配置项键名
   * - 该键为主键且值为唯一值
   */
  @PrimaryColumn({
    type: 'varchar',
    length: 32,
    unique: true,
  })
  key: string

  /**
   * 配置项值
   */
  @Column({
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  value: string

  /**
   * 配置项描述
   */
  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  description: string
}
