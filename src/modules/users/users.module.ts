import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import * as REDIS_CONFIG from 'src/config/redis';
import {
  RolesInfoFieldResolver,
  RolesInfoTypeResolver,
} from 'src/types/unions/roles-info.union';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientsModule } from '../patients/patients.module';

@Module({
  imports: [
    PatientsModule,
    forwardRef(() => DoctorsModule),
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UsersResolver,
    UsersService,
    RolesInfoFieldResolver,
    RolesInfoTypeResolver,
  ],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
