
import { ApiProperty } from '@nestjs/swagger';

export class RolesDto {
    @ApiProperty({ required: false })
    _id: string;
    @ApiProperty({ required: true })
    roleCode: string;
    @ApiProperty({ required: true })
    roleName: string;
    @ApiProperty({ required: false })
    permissions?: any[];
    @ApiProperty({ required: false })
    description: string;
    @ApiProperty({ required: false })
    isActive: boolean;
    @ApiProperty({ required: false })
    createdBy: string;
    @ApiProperty({ required: false })
    createdDate: Date;
    @ApiProperty({ required: false })
    modifiedBy: string;
    @ApiProperty({ required: false })
    modifiedOn: Date;
}
