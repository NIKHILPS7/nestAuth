import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
  } from '@nestjs/common';
  import { BookService } from './book.service';
  import { Book } from '../interfaces/book.interface';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from 'src/requestDto/createBook.dto';
import { AuthGuardService } from 'src/authGuardservice/auth.guard';
import { Roles } from 'src/authGuardservice/roles.decorator';
  @ApiTags('book')
  @Controller('book')
  export class BookController {
    constructor(private readonly bookService: BookService) {}
  
    @Get('allbooks')
    @Roles(['User'])
    @UseGuards(AuthGuardService)
    async findAll(): Promise<Book[]> {
      return this.bookService.findAll();
    }
  
    @Get(':id')
 
    @ApiBearerAuth()
    async findOne(@Param('id') id: string): Promise<Book> {
      return this.bookService.findOne(id);
    }
  
    @Post()
   
    @ApiBearerAuth()
    async create(@Body() book: CreateBookDto): Promise<Book> {
      return this.bookService.create(book);
    }
  
    @Put(':id')

    @ApiBearerAuth()
    async update(
      @Param('id') id: string,
      @Body() book: Book,
    ): Promise<Book> {
      return this.bookService.update(id, book);
    }
  
    @Delete(':id')
 
    @ApiBearerAuth()
    async delete(@Param('id') id: string): Promise<Book> {
      return this.bookService.delete(id);
    }
  }