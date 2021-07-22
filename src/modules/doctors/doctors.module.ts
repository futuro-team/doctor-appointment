import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorsService } from './doctors.service';
import { DoctorsResolver } from './doctors.resolver';
import { Doctor } from './entities/doctor.entity';
import { UsersModule } from 'src/users/users.module';
import { SpecializationsModule } from 'src/specializations/specializations.module';
import { AuthModule } from 'src/auth/auth.module';
import * as REDIS_CONFIG from 'src/config/redis';

@Module({
  imports: [
    UsersModule,
    SpecializationsModule,
    AuthModule,
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([Doctor]),
  ],
  providers: [DoctorsResolver, DoctorsService],
  exports: [DoctorsService, TypeOrmModule],
})
export class DoctorsModule {}