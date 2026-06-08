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
import { SiteConfigModule } from './modules/site-config/site-config.module';
import { NavMenusModule } from './modules/nav-menus/nav-menus.module';
import { FooterModule } from './modules/footer/footer.module';
import { PagesModule } from './modules/pages/pages.module';
import { UploadModule } from './modules/upload/upload.module';
import { UsersModule } from './modules/users/users.module';
import { StatsModule } from './modules/stats/stats.module';
import { BannersModule } from './modules/banners/banners.module';
import { DemandsModule } from './modules/demands/demands.module';
import { IncubateModule } from './modules/incubate/incubate.module';

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
    SiteConfigModule,
    NavMenusModule,
    FooterModule,
    PagesModule,
    UploadModule,
    UsersModule,
    StatsModule,
    BannersModule,
    DemandsModule,
    IncubateModule,
  ],
})
export class AppModule {}
