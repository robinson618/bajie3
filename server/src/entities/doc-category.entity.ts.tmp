import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DocSubcategory } from './doc-subcategory.entity';

@Entity('doc_categories')
export class DocCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  title: string;

  @Column({ default: 'fa-file-text' })
  icon: string;

  @Column({ default: 0, name: 'sort_order' })
  sortOrder: number;

  @Column({ default: 1, name: 'is_active' })
  isActive: number;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @OneToMany(() => DocSubcategory, (s) => s.category)
  subcategories: DocSubcategory[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
