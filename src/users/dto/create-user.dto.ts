import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty, Matches, MaxLength, MinLength} from "class-validator";
import { UserConstant } from "../users.constant";

export class CreateUserDto {
    @ApiProperty({default: "alif"})
    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(UserConstant.MaxNameLength)
    name: string;

    @ApiProperty({default: "alif@gmail.com"})
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(UserConstant.MaxEmailLength)
    email: string;

    @ApiProperty({default: "Alif2020"})
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    {message: 'password too weak'})
    password: string;

    @ApiProperty({default: "alif2020"})
    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(6)
    @MaxLength(UserConstant.MaxUsernameLength)
    username: string;

    @ApiProperty({default: 2})
    @IsNotEmpty()
    roleId: number;
}

