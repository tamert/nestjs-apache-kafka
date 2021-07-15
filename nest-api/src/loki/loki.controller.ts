import {Controller, Get, Inject, OnModuleInit} from '@nestjs/common';
import {ClientKafka} from '@nestjs/microservices';
import {Producer} from '@nestjs/microservices/external/kafka.interface';

@Controller('checkout')
export class LokiController implements OnModuleInit {
    private producer: Producer;

    constructor(
        @Inject('KAFKA_SERVICE')
        private client: ClientKafka,
    ) {
    }

    async onModuleInit() {
        const requestPatterns = ['kang'];
        for (const pattern of requestPatterns) {
            this.client.subscribeToResponseOf(pattern);
            await this.client.connect();
        }
    }

    @Get()
    checkout() {
        return this.client.send('kang', {request: "Hey bro can you give me an apple?"});
    }
}
