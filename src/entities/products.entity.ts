import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column('text', { nullable: true, array: true, default: null })
  photos: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ nullable: false })
  category: string;

  @Column('text', { nullable: false, array: true })
  tags: string[];

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false })
  publisher: string;

  @Column({ nullable: false, default: new Date() })
  created_at: Date;

  @Column({ nullable: false, default: new Date() })
  updated_at: Date;

  @ManyToMany(() => User, (user) => user.favorites)
  @JoinTable()
  favoritedBy: User[];
}
