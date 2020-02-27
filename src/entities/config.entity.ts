import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Config {
  /**
   * 配置项键名
   */
  @PrimaryColumn({
    type: 'varchar',
    length: 64,
  })
  key: string

  /**
   * 配置项值
   */
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  value: string

  /**
   * 配置项描述
   */
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  description: string
}
