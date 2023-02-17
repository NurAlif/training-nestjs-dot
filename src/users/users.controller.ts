import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entities/role.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const findRole : Role = await this.rolesService.findOne(createUserDto.roleId);
    if(findRole == null) throw new HttpException('Role Not Found', HttpStatus.BAD_REQUEST);

    const userByUsername : User = await this.usersService.findOneByUsername(createUserDto.username);
    const userByEmail : User = await this.usersService.findOneByEmail(createUserDto.email);
    if(userByUsername != null || userByEmail != null) throw new HttpException('User Already exist', HttpStatus.BAD_REQUEST);
    
    let newUser : any = <any> createUserDto;
    newUser.role = findRole;
    
    this.usersService.create(newUser);
    const {password, role, ...rest} = newUser;
    return rest;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users : User[] = await this.usersService.findAll();
    // const [{password, role, ...rest}] = users;
    return users;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user : User = await this.usersService.findOne(+id);
    if(user == null) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const {password, ...rest} = user;
    return rest;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user : User = await this.usersService.findOne(+id);
    if(user == null) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user : User = await this.usersService.findOne(+id);
    if(user == null) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return this.usersService.remove(+id);
  }
}
