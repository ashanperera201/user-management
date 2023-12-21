import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ required: false })
    _id?: string;
    userUniqueId?: string;
    @ApiProperty({ required: true })
    userName: string;
    @ApiProperty({ required: true })
    firstName: string;
    @ApiProperty({ required: false })
    lastName: string;
    @ApiProperty({ required: false })
    middleName: string;
    @ApiProperty({ required: true })
    password: string;
    @ApiProperty({ required: false })
    passwordSalt?: string;
    @ApiProperty({ required: true })
    email: string;
    @ApiProperty({ required: false })
    secondaryEmail: string;
    @ApiProperty({ required: false })
    profile: string;
    @ApiProperty({ required: false })
    address: string;
    @ApiProperty({ required: false })
    contactNumber: string;
    @ApiProperty({ required: false })
    countryCode: string;
    @ApiProperty({ required: false })
    loginAttempts: number;
    @ApiProperty({ required: false })
    loginFailedAttempts: number;
    @ApiProperty({ required: false })
    roles: any;
    @ApiProperty({ required: false })
    passportNumber: string;
    @ApiProperty({ required: false })
    userType: string;
    @ApiProperty({ required: true })
    isActive: boolean;
    @ApiProperty({ required: false })
    createdDate?: Date;
    @ApiProperty({ required: false })
    createdBy?: string;
    @ApiProperty({ required: false })
    modifiedBy?: string;
    @ApiProperty({ required: false })
    modifiedOn?: Date;
}