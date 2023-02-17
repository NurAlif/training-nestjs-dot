import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserProviders } from './users.providers';
import { RolesModule } from 'src/roles/roles.module';
import { RolesService } from 'src/roles/roles.service';
import { RoleProviders } from 'src/roles/roles.providers';

@Module({
  imports:[DatabaseModule, RolesModule],
  controllers: [UsersController],
  providers: [...UserProviders, UsersService],
  exports: [...UserProviders, UsersService]
})
export class UsersModule {}
