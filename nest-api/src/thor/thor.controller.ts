import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ThorController {
    @MessagePattern('thor')
    Validate(@Payload() message){
        return {
            "request": message.value,
            "thor" : "Yes I have. Here's an apple for you"
        };
    }
}
