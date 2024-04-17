import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../interfaces/book.interface';
import { CreateBookDto } from 'src/requestDto/createBook.dto';
import { Books, BooksDocument } from 'src/schemas/book.schema';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';

@Injectable()
export class BookService {

    constructor(@InjectModel(Books.name) 
    private bookModel: Model<BooksDocument>, 
    private responseHandler: ResponseHandlerService) { }

    async getAllBooks() {
        try {
            const books = this.bookModel.find({}).exec()

            return books

        } catch (error) {
            this.responseHandler.errorformating('getAllBooks', error.message);
        }
        return {
            message: 'something went wrong',
            statusCode: 200,
        };
    }

    async createBook(input: CreateBookDto) {
        try {
            const bookData = new Books();
            bookData.name = input.name;
            bookData.frontImage = input.frontImage;
            bookData.description = input.description;
            const createResponse = await this.bookModel.create(bookData);

            if (createResponse) {
                const resposneData = {
                    message: 'book created successfully',
                    statusCode: 200,
                };
                return resposneData;
            }

        } catch (err) {
            console.log(err,'eerrrr')
            this.responseHandler.errorformating('createUser', err.message);
        }
        return {
            message: 'something went wrong',
            statusCode: 200,
        };
    }

}