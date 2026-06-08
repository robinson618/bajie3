import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('site_configs')
export class SiteConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: 'config_key' })
  configKey: string;

  @Column({ type: 'text', name: 'config_value' })
  configValue: string;

  @Column({ nullable: true, name: 'config_type' })
  configType: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
