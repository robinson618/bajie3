import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('faq_items')
export class FaqItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ nullable: true })
  category: string;

  @Column({ default: 0, name: 'sort_order' })
  sortOrder: number;

  @Column({ default: 1, name: 'is_active' })
  isActive: number;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
