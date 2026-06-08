import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('nav_menus')
export class NavMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: 0, name: 'parent_id' })
  parentId: number;

  @Column({ default: '_self' })
  target: string;

  @Column({ default: 0, name: 'sort_order' })
  sortOrder: number;

  @Column({ default: 1, name: 'is_active' })
  isActive: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
