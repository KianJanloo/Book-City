import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('text', { nullable: false, array: true })
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
}
