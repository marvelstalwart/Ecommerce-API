import { Injectable, Logger } from "@nestjs/common";
import { Prisma, User } from "generated/prisma";
import { PrismaService } from "../../database/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserRepository {
    private readonly logger = new Logger(UserRepository.name);
    constructor (private readonly prisma: PrismaService) {}

    async create(data: CreateUserDto) : Promise<User> {
        try {
            return await this.prisma.user.create({
                data
            })
        } catch (error) {
            this.logger.error(`Failed to create user: ${error.message}`);
            throw error;
        }
    }
    async findByEmail(email: string) : Promise<User | null>{
            return await this.prisma.user.findUnique({
                where: {email}
            })
        }
    async findById(id: string): Promise<User | null> {
            return await this.prisma.user.findUnique({
                where: {id}
            })
        }

    async findAll () : Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return await this.prisma.user.update({
            where: {id},
            data
        })
    }

    async deleteUser(id: string): Promise<User> {
        return await this.prisma.user.delete({
            where: {id}
        })
    }


}