import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({default: "manager"})
    @IsAlphanumeric()
    name: string;

    @ApiProperty({default: 4})
    @IsNotEmpty()
    level: number;
}
