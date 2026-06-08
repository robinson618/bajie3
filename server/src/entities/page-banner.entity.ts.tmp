import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('page_banners')
export class PageBanner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'page_slug' })
  pageSlug: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 1, name: 'is_active' })
  isActive: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
