import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('demands')
export class Demand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'contact_name' })
  contactName: string;

  @Column({ name: 'contact_phone' })
  contactPhone: string;

  @Column({ nullable: true, name: 'contact_email' })
  contactEmail: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
