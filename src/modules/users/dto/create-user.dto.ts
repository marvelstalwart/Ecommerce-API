import {
    IsEmail,
    IsNotEmpty,
    IsString, MinLength
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    
    @ApiProperty({
        example: 'Marvel',
        description: 'User first name'
    })
    
    @IsString()
    @IsNotEmpty({message: 'First name is required'})
    @MinLength(2, {message: 'First name must be at least 2 characters'})
    firstName: string;

    @ApiProperty({
        example: 'Stalwart',
        description: 'User last name'
    })

    @IsString()
    @IsNotEmpty({message: 'Last name is required'})
    @MinLength(2, {message: 'Last name must be at least 2 characters'})
    lastName: string;

    @ApiProperty({
        example: 'marvel@example.com',
        description: 'User email address',
    })
    @IsEmail({}, {message: 'Please provide a valid email address'})
    @IsNotEmpty({message: 'Email is required'})
    email: string;
    
    @ApiProperty({
        example: 'securePassword123',
        description: "User's secure password"
    })
    @IsString()
    @IsNotEmpty({message: 'Password is required'})
    @MinLength(8, {message: 'Password must be at least 8 characters'})
    password: string;

    

}