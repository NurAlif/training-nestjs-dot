import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';
import { CreateUserDto } from './create-user.dto';


export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({default: "alifilyasa"})
    name?: string;
    
    @ApiProperty({default: "alif@gmail.com"})
    email?: string;

    @ApiProperty({default: "Alif2020"})
    password?: string;

    @ApiProperty({default: "alif2020"})
    username?: string;

    @ApiProperty({default: 3})
    roleId?: number;
}
