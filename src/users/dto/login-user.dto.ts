import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { UserConstant } from "../users.constant";

export class LoginUserDto{
    @ApiProperty({default: "alif2020"})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(UserConstant.MaxUsernameLength)
    username: string;

    @ApiProperty({default: "Alif2020"})
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}