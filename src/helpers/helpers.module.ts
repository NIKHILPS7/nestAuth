import { Module } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserCredentials,
  UserCredentialsSchema,
} from 'src/schemas/UserCredentials.schema';
import { Logs, LogsSchema } from 'src/schemas/Logs.schema';
import { ConfigService, ConfigModule } from '@nestjs/config';
@Module({
  providers: [HelpersService, ResponseHandlerService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: UserCredentials.name, schema: UserCredentialsSchema },
      { name: Logs.name, schema: LogsSchema },
    ]),
  ],
})
export class HelpersModule {}
