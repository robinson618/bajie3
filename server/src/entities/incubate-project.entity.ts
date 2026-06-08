import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('incubate_projects')
export class IncubateProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'team_name' })
  teamName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true, name: 'cover_image' })
  coverImage: string;

  @Column({ default: 0 })
  progress: number;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
