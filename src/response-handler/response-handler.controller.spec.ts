import { Test, TestingModule } from '@nestjs/testing';
import { ResponseHandlerController } from './response-handler.controller';

describe('ResponseHandlerController', () => {
  let controller: ResponseHandlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponseHandlerController],
    }).compile();

    controller = module.get<ResponseHandlerController>(
      ResponseHandlerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
