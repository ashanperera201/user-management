
import { ApiProperty } from '@nestjs/swagger';

export class PermissionsDto {
    @ApiProperty({ required: false })
    _id: string;
    @ApiProperty({ required: true })
    permissionCode: string;
    @ApiProperty({ required: true })
    permissionName: string;
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
