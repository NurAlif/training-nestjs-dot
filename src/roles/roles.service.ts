import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<any> {
    return await this.roleRepository.save(createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role: Role = await this.roleRepository.findOne({
      where: {
        id: id
      },
      relations: {
        users: true
      }
    })
    if (role == null) throw new HttpException('Role not found', HttpStatus.BAD_REQUEST);
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<any> {
    return await this.roleRepository.update(id, updateRoleDto);
  }

  async remove(id: number): Promise<any> {
    return await this.roleRepository.delete(id);
  }
}
