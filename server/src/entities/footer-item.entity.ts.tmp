import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('footer_items')
export class FooterItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'section_title' })
  sectionTitle: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: 0, name: 'sort_order' })
  sortOrder: number;

  @Column({ default: 1, name: 'is_active' })
  isActive: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
