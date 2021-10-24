import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {HttpService} from "@nestjs/axios";

@Controller()
export class ThorController {
    constructor(private httpService: HttpService) {
    }

    @MessagePattern('thor')
    async validate(@Payload() message) {
        const response: any = await this.httpService.get('https://api.github.com/users/tamert').toPromise();
        return {
            "request": message.value,
            "thor": "Yes I have. Here's an apple for you." + response.data?.name
        };
    }
}
