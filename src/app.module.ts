import { Module } from '@nestjs/common';
import{ MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-mongodb'), 
    UsersModule, PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
