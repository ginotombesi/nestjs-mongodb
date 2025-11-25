import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsOptional()
    displayName?: string;
}

// no agregamos avatarUrl porque cuando te creas la cuenta no es necesario.
