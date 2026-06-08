import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { AppCapability } from './app-capability.entity';

@Entity('apps')
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'v1.0.0' })
  version: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, type: 'text' })
  introduction: string;

  @Column({ nullable: true, name: 'tech_stack' })
  techStack: string;

  @Column({ nullable: true, name: 'github_url' })
  githubUrl: string;

  @Column({ nullable: true, name: 'cover_image' })
  coverImage: string;

  @Column({ nullable: true })
  video: string;

  @Column({ default: 1, name: 'is_published' })
  isPublished: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  views: number;

  @OneToMany(() => AppCapability, (cap) => cap.app, { cascade: true })
  capabilities: AppCapability[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
