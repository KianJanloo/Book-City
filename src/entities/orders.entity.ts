import { Cart } from 'src/entities/cart.entity';
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

  @ManyToOne(() => Cart)
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @Column({ nullable: false })
  cartId: number;

  @Column({
    nullable: false,
    default: 'pending',
  })
  paymentStatus: string;
}
