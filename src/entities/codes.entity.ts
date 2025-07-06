import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Code {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  code: string;

  @Column({ nullable: false, default: false })
  isValid: boolean;
}
