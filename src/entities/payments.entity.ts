import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  orderId: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  amount: number;

  @Column({
    nullable: false,
    default: 'pending',
    enum: ['pending', 'completed', 'cancelled'],
  })
  status: string;

  @Column({ nullable: true, default: null })
  receipt: string;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
