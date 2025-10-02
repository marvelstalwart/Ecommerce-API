import { User } from "generated/prisma";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./user.repository";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    createUser(data: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}
