import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/users.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/'),
    UserModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ]
})
export class AppModule {}
