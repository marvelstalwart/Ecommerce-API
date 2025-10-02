import { User } from "generated/prisma";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: CreateUserDto): Promise<User>;
    get(): String;
}
