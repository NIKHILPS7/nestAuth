// book.module.ts
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from '../schemas/book.schema';
import { DatabaseModule } from '../database/database.module';
import { AuthGuardService } from 'src/authGuardservice/auth.guard';
import { HelpersService } from 'src/helpers/helpers.service';
import { UserCredentials, UserCredentialsSchema } from 'src/schemas/UserCredentials.schema';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import { Logs, LogsSchema } from 'src/schemas/Logs.schema';
import { settings, SettinsSchema } from 'src/schemas/Settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema },{ name: UserCredentials.name, schema: UserCredentialsSchema }, { name: settings.name, schema: SettinsSchema },
    { name: Logs.name, schema: LogsSchema },]),
    DatabaseModule,
  ],
  controllers: [BookController],
  providers: [BookService,AuthGuardService,HelpersService,ResponseHandlerService],
})
export class BookModule {}