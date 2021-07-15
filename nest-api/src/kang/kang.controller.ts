import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

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
    this.client.subscribeToResponseOf('thor');
  }

  @MessagePattern('kang')
  async consumePayment(@Payload() message) {


    // Thor'dan alıp vereceğim
    await this.client.send(
      'thor',
      JSON.stringify({ request: 'elma lazım verebilir misin?', loki: message.value.request }),
    ).subscribe(reply => {
      console.log(reply);
      return reply;
    });

  }
}


