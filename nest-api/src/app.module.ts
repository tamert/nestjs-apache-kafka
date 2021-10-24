import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LokiController } from './loki/loki.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KangController } from './kang/kang.controller';
import { ThorController } from './thor/thor.controller';
import { LokiResolver } from './loki/loki.resolver';
import {GraphQLModule} from "@nestjs/graphql";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: process.env.NODE_ENV !== 'prod',
      autoLoadEntities: true,
    }),
    //TypeOrmModule.forFeature([]),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      playground: true,
      debug: false,
      introspection: true,
      autoSchemaFile: './schema.gql',
      sortSchema: true,
      context: ({ req }) => ({ ...req }),
    }),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['host.docker.internal:9094'],
          },
          consumer: {
            groupId: 'my-consumer-' + Math.random(),
          },
        },
      },
    ]),
  ],
  controllers: [AppController, LokiController, KangController, ThorController],
  providers: [AppService, LokiResolver],
})
export class AppModule {}
