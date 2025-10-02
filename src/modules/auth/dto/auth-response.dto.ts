import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AuthResponseDto {
    @ApiProperty()
    @Expose()
    accessToken: string;

    @ApiProperty()
    @Expose()
    refreshToken: string;

    @ApiProperty()
    @Expose()
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };


    constructor(partial: Partial<AuthResponseDto>) {
        Object.assign(this, partial)
    }
}