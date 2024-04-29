import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
