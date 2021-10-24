import {Resolver, Query} from '@nestjs/graphql';
import {Producer} from "@nestjs/microservices/external/kafka.interface";
import {Inject, OnModuleInit} from "@nestjs/common";
import {ClientKafka} from "@nestjs/microservices";
import {CheckoutResponseDto} from "./dto/checkout-response.dto";

@Resolver()
export class LokiResolver implements OnModuleInit {
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

    @Query(() => CheckoutResponseDto)
    async checkout() {
        return this.client.send('kang', {request: "Hey bro can you give me an apple?"});
    }

}
