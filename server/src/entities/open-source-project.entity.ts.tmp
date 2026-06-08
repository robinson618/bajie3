import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('open_source_projects')
export class OpenSourceProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'v1.0.0' })
  version: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, name: 'python_url' })
  pythonUrl: string;

  @Column({ nullable: true, name: 'cpp_url' })
  cppUrl: string;

  @Column({ nullable: true })
  category: string;

  @Column({ default: 1, name: 'is_published' })
  isPublished: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
