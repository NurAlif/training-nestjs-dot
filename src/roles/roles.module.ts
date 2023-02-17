import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { DatabaseModule } from 'src/database/database.module';
import { RoleProviders } from './roles.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RolesController],
  providers: [...RoleProviders, RolesService],
  exports: [...RoleProviders, RolesService]
})
export class RolesModule {}
