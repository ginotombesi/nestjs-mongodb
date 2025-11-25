import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Param, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/Create-User.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    // @UsePipes(new ValidationPipe())  --> a eso lo pondriamos solo si no tuvieramos el validation pipe en el main.ts
    async createUser(@Body() createUserDto: CreateUserDto) {
        const newUser = await this.usersService.createUser(createUserDto);
        return newUser;
    }

    @Get()
    async findAllUsers() {
        const allUsers = await this.usersService.findAllUsers();
        return allUsers;
    }

    @Get(':username')
    async getUserByUsername(@Param('username') username: string) {
        const oneUser = await this.usersService.getUserByUsername(username);
        return oneUser;
    }

    @Get('id/:id')
    async getUserById(@Param('id') id: string) {
        const oneUser = await this.usersService.getUserById(id);
        return oneUser;
    }


}
