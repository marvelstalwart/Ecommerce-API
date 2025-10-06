import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseInterceptors
} from "@nestjs/common";
import {
    ApiOperation,
    ApiTags
} from "@nestjs/swagger";
import { UserService } from "./user.service";

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor (private readonly userService: UserService) {}
    // @Post()
    // @HttpCode(HttpStatus.CREATED)
    // // Swagger docs
    // @ApiOperation({summary: 'Create a new user'})
    // @ApiBody({type: CreateUserDto})
    // @ApiResponse({
    //     status: HttpStatus.CREATED,
    //     description: 'User created successfully',
    //     type: UserResponseDto
    // })

    // @ApiResponse({
    //     status: HttpStatus.CONFLICT,
    //     description: 'Conflict - user with this email exists'
    // })
    // @ApiResponse({
    //     status: HttpStatus.BAD_REQUEST,
    //     description: 'Bad Request - validation failed!'
    // })
    
    // async create(@Body() data: CreateUserDto): Promise<User> {
    //     return this.userService.createUser(data);
    // }

    @Get('me')
    @HttpCode(HttpStatus.OK)
    //Swagger docs
    @ApiOperation({summary: 'Fetch a single user'})
    get() : String {
        return "Hello";
    }



}

