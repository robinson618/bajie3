import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { NewsModule } from './modules/news/news.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { SkillsModule } from './modules/skills/skills.module';
import { AppsModule } from './modules/apps/apps.module';
import { FaqModule } from './modules/faq/faq.module';
import { OpenSourceModule } from './modules/open-source/open-source.module';
import { DiscussionsModule } from './modules/discussions/discussions.module';
import { DocumentsModule } from './modules/documents/documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../.env', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    AuthModule,
    NewsModule,
    ActivitiesModule,
    SkillsModule,
    AppsModule,
    FaqModule,
    OpenSourceModule,
    DiscussionsModule,
    DocumentsModule,
  ],
})
export class AppModule {}
