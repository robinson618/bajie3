import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('page_seo')
export class PageSeo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: 'page_slug' })
  pageSlug: string;

  @Column({ nullable: true, name: 'meta_title' })
  metaTitle: string;

  @Column({ nullable: true, type: 'text', name: 'meta_description' })
  metaDescription: string;

  @Column({ nullable: true, name: 'meta_keywords' })
  metaKeywords: string;

  @Column({ nullable: true, name: 'og_title' })
  ogTitle: string;

  @Column({ nullable: true, type: 'text', name: 'og_description' })
  ogDescription: string;

  @Column({ nullable: true, name: 'og_image' })
  ogImage: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
