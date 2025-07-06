import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { Product } from 'src/entities/products.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, (product) => product.favoritedBy, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ default: new Date() })
  createdAt: Date;
}
