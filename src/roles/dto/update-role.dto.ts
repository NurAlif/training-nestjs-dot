import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty({default: "manager"})
    name?: string;

    @ApiProperty({default: 3})
    level?: number;
}
