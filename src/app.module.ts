import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthGuardService } from './authGuardservice/auth.guard';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { HelpersModule } from './helpers/helpers.module';
import { HelpersService } from './helpers/helpers.service';
import { ResponseHandlerModule } from './response-handler/response-handler.module';
import { ResponseHandlerService } from './response-handler/response-handler.service';
import { Logs, LogsSchema } from './schemas/Logs.schema';
import { settings, SettinsSchema } from './schemas/Settings.schema';
import { UserCredentials, UserCredentialsSchema } from './schemas/UserCredentials.schema';

@Module({
  imports: [MongooseModule.forFeature([  { name: Logs.name, schema: LogsSchema },
    { name: UserCredentials.name, schema: UserCredentialsSchema },
    { name: settings.name, schema: SettinsSchema }]),BookModule,  DatabaseModule, AuthenticationModule,
    ResponseHandlerModule,
    HelpersModule,],
  controllers: [AppController,AuthenticationController],
  providers: [
    ResponseHandlerService,
    AuthenticationService,
    HelpersService,AppService,AuthGuardService,AuthenticationService],
})
export class AppModule {}