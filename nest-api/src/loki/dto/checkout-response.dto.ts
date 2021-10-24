import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LokiAndKangDialog {
    @Field()
    kang: string;

    @Field()
    loki: string;
}

@ObjectType()
export class CheckoutResponseDto {

    @Field()
    request: LokiAndKangDialog;

    @Field()
    thor: string;
}
