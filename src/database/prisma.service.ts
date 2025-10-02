import {
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit
} from "@nestjs/common";

 import { PrismaClient } from "generated/prisma";
@Injectable() 
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);
    constructor(){
        super({
            log: [
                {emit: 'event', level: 'query'},
                {emit: 'event', level: 'error'},
                {emit: 'event', level: 'info'},
                {emit: 'event', level: 'warn'},
            ],
            errorFormat: 'colorless'
        })

        if (process.env.NODE_ENV === 'development') {
            this.$on('query' as never, (e: any) => {
                this.logger.debug(`Query: ${e.query}`);
                this.logger.debug(`Params: ${e.params}`);
                this.logger.debug(`Duration: ${e.duration}ms`);
            });
        }
    this.$on('error' as never, (e:any)=> {
        this.logger.error(e)
    })

    }
    
  
    async onModuleInit() {
        await this.$connect();
        this.logger.log('Database connected successfully')
    }

    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Database disconnected')
    }
}