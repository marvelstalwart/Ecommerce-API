import { Module } from "@nestjs/common";
import {ConfigModule} from '@nestjs/config'
import { APP_FILTER } from "@nestjs/core";
import { PrismaModule } from "./database/prisma.module";
import { UsersModule } from "./modules/users/users.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:   `.env.${process.env.NODE_ENV || 'development'}`
        }),
        PrismaModule,
        UsersModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ]
})
export class AppModule {}