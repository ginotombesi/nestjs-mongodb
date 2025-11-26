import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './Create-Post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
