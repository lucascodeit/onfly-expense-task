import { UserEntity } from '../../../../user/infra/db/entities/user-entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'

@Entity('expense')
export class ExpenseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  value: number

  @Column()
  date: Date

  @Column({ length: 191 })
  description: string

  @ManyToOne(() => UserEntity, { cascade: true })
  user: UserEntity

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
