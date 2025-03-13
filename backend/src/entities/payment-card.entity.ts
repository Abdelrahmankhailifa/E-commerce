import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payment_cards')
export class PaymentCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  last4: string;

  @Column()
  brand: string;

  @Column()
  stripeCardId: string;

  @Column({ nullable: true })
  expiryMonth: string;

  @Column({ nullable: true })
  expiryYear: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
