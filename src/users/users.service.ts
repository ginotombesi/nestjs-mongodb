import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/Create-User.dto';
import { UpdateUserDto } from './dto/Update-User.dto';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    if (
      await this.userModel.findOne({ username: createUserDto.username }).exec()
    ) {
      throw new HttpException(
        `el usuario con username ${createUserDto.username} ya existe`,
        409,
      );
    }
    return newUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    const allUsers = await this.userModel.find().exec();
    return allUsers;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new HttpException(
        `el usuario con username ${username} no existe`,
        404,
      );
    }
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException(`el ID ${id} no es valido`, 400);
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException(`el usuario con ID ${id} no existe`, 404);
    }
    return user;
  }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new HttpException(`el ID ${id} no es valido`, 400);
        }

        // actualizamos el usuario
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();

        // si el usuario no existe lanzamos error
        if (!updatedUser) {
            throw new HttpException(`el usuario con ID ${id} no existe`, 404);
        }
        
        return updatedUser;
    }
}
