import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ThorController {
    @MessagePattern('thor')
    Validate(@Payload() message){
        return {
            "request": message,
            "response" : "al sana elma"
        };
    }
}
