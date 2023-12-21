import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto {
    @ApiProperty({ required: true })
    userName: string;
    @ApiProperty({ required: true })
    password: string;
}