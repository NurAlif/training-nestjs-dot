import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: User) {
    const saltOrRounds = 10;
    const plainPassword = createUserDto.password;
    const hash = await bcrypt.hash(plainPassword, saltOrRounds);
    createUserDto.password = hash;

    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: {
        role: true
      }
    })
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username: username } })
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } })
  }

  async update(id: number, updateUserDto: any): Promise<any> {
    return await this.userRepository.update(id, updateUserDto)
  }

  async remove(id: number): Promise<any> {
    return await this.userRepository.delete(id)
  }
}
