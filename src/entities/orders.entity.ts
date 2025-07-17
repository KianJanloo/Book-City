import { User } from 'src/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  userId: number;

  @Column({ type: 'json', nullable: false, default: [] })
  books: any[];

  @Column({ nullable: false })
  cartId: number;

  @Column({ nullable: false, default: new Date() })
  date: Date;
}
