import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://NikhilPS123:Asdf123@cluster1.lwq7hkn.mongodb.net/'),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}