import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('billing')
export class BillingDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  companyName: string;

  @Column()
  country: string;

  @Column()
  streetAddress: string;

  @Column()
  townCity: string;

  @Column()
  stateCounty: string;

  @Column()
  postcodeZip: string;

  @Column()
  phoneNumber: string;

  @Column()
  emailAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
