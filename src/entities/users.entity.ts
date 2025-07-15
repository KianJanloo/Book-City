import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './products.entity';
import { Message } from './messages.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: false, default: 'user', enum: ['user', 'admin'] })
  role: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: false, default: new Date() })
  created_at: Date;

  @Column({ nullable: false, default: new Date() })
  updated_at: Date;

  @ManyToMany(() => Product, (product) => product.favoritedBy)
  favorites: Product[];

  @OneToMany(() => Message, (message) => message.userId)
  messages: Message[];
}
