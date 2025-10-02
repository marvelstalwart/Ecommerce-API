import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsEmail({}, {message: 'Please provide a valid email address'})
    @IsNotEmpty({message:'Email is required'})
    @ApiProperty({
        description: "User email",
        example: "marvel@example.com"
    })
    email: string

    @IsNotEmpty({message: 'Password is required'})
    @IsString()
    @ApiProperty({
        description: "User password",
        example: "securePass123"
    })
    password: string
    
}