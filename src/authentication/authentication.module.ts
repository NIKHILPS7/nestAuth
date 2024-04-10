import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserCredentials,
  UserCredentialsSchema,
} from 'src/schemas/UserCredentials.schema';
import { settings, SettinsSchema } from 'src/schemas/Settings.schema';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import { Logs, LogsSchema } from 'src/schemas/Logs.schema';
import { HelpersService } from 'src/helpers/helpers.service';
import { AuthGuardService } from 'src/authGuardservice/auth.guard';

@Module({
  providers: [
    AuthenticationService,
    ResponseHandlerService,
    HelpersService,
    AuthGuardService,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: UserCredentials.name, schema: UserCredentialsSchema },
      { name: settings.name, schema: SettinsSchema },
      { name: Logs.name, schema: LogsSchema },
    ]),
  ],
})
export class AuthenticationModule {}
