import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/Create-Post.dto';
import { UpdatePostDto } from './dto/Update-Post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schemas/Post.schema';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>) {}

  async createPost({ userId, ...createPostDto}: CreatePostDto) {
    const findUser = await this.userModel.findById(userId)
    if (!findUser) {
      throw new HttpException(
        `el usuario con ID ${userId} no existe`,
        404,
      );
    }

    const newPost = new this.postModel(createPostDto);
    const savedPost = await newPost.save();
    await findUser.updateOne({ $push: { posts: savedPost._id } });
    return savedPost;
  }

  async findAllPosts() {
    return await this.postModel.find().exec();
  }

  async findOnePost(id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      throw new HttpException(`el ID ${id} no es valido`, 400);
    }

    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new HttpException(`el post con ID ${id} no existe`, 404);
    }
    return post;
  }

  updatePost(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async removePost(id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      throw new HttpException(`el ID ${id} no es valido`, 400);
    }

    const deletedPost = await this.postModel.findByIdAndDelete(id).exec();
    if (!deletedPost) {
      throw new HttpException(`el post con ID ${id} no existe`, 404);
    }
    return deletedPost;
  }
}
