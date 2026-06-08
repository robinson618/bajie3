import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, name: 'feature_intro', type: 'text' })
  featureIntro: string;

  @Column({ nullable: true, name: 'tech_specs', type: 'text' })
  techSpecs: string;

  @Column({ nullable: true, name: 'supported_devices', type: 'text' })
  supportedDevices: string;

  @Column({ nullable: true, name: 'document_url' })
  documentUrl: string;

  @Column({ nullable: true, name: 'download_url' })
  downloadUrl: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  version: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true, name: 'skill_category' })
  skillCategory: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  downloads: number;

  @Column({ default: 1, name: 'is_published' })
  isPublished: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
