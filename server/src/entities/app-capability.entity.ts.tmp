import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { App } from './app.entity';

@Entity('app_capabilities')
export class AppCapability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'app_id' })
  appId: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @ManyToOne(() => App, (app) => app.capabilities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'app_id' })
  app: App;
}
