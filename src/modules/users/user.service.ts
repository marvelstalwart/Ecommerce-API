import { ConflictException, Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { User } from "generated/prisma";
import { hashPassword } from "../../common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {

    constructor (private readonly userRepository: UserRepository) {}

    async createUser (data: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new ConflictException(`User with email ${data.email} already exists`);
        }
        data.password = await hashPassword(data.password);

       const newUser =  await this.userRepository.create(data);
        //Excludes password from the returned user object
       return plainToInstance(UserResponseDto, newUser, {excludeExtraneousValues: true});


    }
    

    async findByEmail (email: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return null;
        }
        return plainToInstance(UserResponseDto, user, {excludeExtraneousValues: true});
    }
    
    // Password to be used for user auth
    async findByEmailWithPassword(email: string) {
        return this.userRepository.findByEmail(email)
    }

    async findById (id: string): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            return null;
        }
        return plainToInstance(UserResponseDto, user, {excludeExtraneousValues: true});
    }

    


    
}