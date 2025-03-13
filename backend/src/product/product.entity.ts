import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
@Entity()
export class Product {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  imageUrl: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount?: number;

  @Column({ type: 'varchar', length: 255 })
  category: string;
}
