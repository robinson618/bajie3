import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  type: string;

  @Column({ default: 'upcoming' })
  status: string;

  @Column()
  date: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 0 })
  participants: number;

  @Column({ nullable: true, name: 'max_participants' })
  maxParticipants: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
