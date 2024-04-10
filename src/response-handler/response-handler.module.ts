import { Module } from '@nestjs/common';
import { ResponseHandlerController } from './response-handler.controller';

@Module({
  controllers: [ResponseHandlerController],
})
export class ResponseHandlerModule {}
