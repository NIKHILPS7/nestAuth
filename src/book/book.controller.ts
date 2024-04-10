import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    Req,
    Res,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '../interfaces/book.interface';
import { ApiBearerAuth, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from 'src/requestDto/createBook.dto';
import { AuthGuardService } from 'src/authGuardservice/auth.guard';
import { Roles } from 'src/authGuardservice/roles.decorator';
import { CreateUserDTO } from 'src/requestDto/createUser.dto';
import { createUserResponseDto } from 'src/responseDto/createUserResponse.dto';
import { Request, Response } from 'express';
import { createBookResponseDto } from 'src/responseDto/createBookResponse.dto';
@ApiTags('book')
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get('getAllBooks')
    // @Roles(['User'])
    // @UseGuards(AuthGuardService)
    async getAllBooks() {
        return this.bookService.getAllBooks();
    }

    @Post('createBook')
    @ApiProperty({ type: CreateBookDto })
    @ApiResponse({ status: 200, description: 'Success', type: createBookResponseDto })
    @UsePipes(ValidationPipe)
    async createUser(
        @Req() request: Request,
        @Res() response: Response,
        @Body() input: CreateBookDto,
    ) {
        response.send(await this.bookService.createBook(input));
    }
}