import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Config {
  @PrimaryColumn({
    type: 'varchar',
    length: 255,
  })
  key: string

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  value: string

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  description: string
}
