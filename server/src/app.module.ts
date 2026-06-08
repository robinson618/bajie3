import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';

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
  ],
})
export class AppModule {}
ENDOFFILE; __tr_native_ec=$?; pwd -P >| '/var/folders/bj/brc4gsps4tjgknm93lxfcwvr0000gn/T/agent-toolhost/jobs/job-12316b4e5f5841b2b5685e423c5c1827/cwd.txt'; exit "$__tr_native_ec"