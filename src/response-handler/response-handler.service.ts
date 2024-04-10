import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logs, LogsDocument } from 'src/schemas/Logs.schema';

@Injectable()
export class ResponseHandlerService {
  constructor(
    @InjectModel(Logs.name)
    private LogsModel: Model<LogsDocument>,
  ) {}

  responseformatting(status, data, message) {
    const response = {
      status: status,
      error: null,
      message: message,
      response: data,
    };
    return response;
  }

  async errorformating(functionname: string, error: string) {
    const logsData = new Logs();
    logsData.functionName = functionname;
    logsData.errorDescription = error;
    await this.LogsModel.create(logsData);
    // throw new HttpException(
    //   {
    //     statusCode: 503,
    //     message: functionname,
    //     error: error,
    //   },
    //   503,
    // );
  }
}
