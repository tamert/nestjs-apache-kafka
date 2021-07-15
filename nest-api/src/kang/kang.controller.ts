import {Controller, Inject, OnModuleInit} from '@nestjs/common';
import {ClientKafka, MessagePattern, Payload} from '@nestjs/microservices';

//rxjs
//request-reply | request-response
@Controller()
export class KangController implements OnModuleInit {
    constructor(
        @Inject('KAFKA_SERVICE')
        private client: ClientKafka,
    ) {
    }

    async onModuleInit() {
        const requestPatterns = ['thor'];
        for (const pattern of requestPatterns) {
            this.client.subscribeToResponseOf(pattern);
            await this.client.connect();
        }
    }

    @MessagePattern('kang')
    consumePayment(@Payload() message) {
        return this.client.send(
            'thor',
            {kang: 'lokiye elma lazımmış verebilir misin?', loki: message.value.request},
        )
    }
}


