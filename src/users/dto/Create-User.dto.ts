import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class CreateUserSettingsDto {
    @IsBoolean()
    @IsOptional()
    receiveNotifications?: boolean;

    @IsBoolean()
    @IsOptional()
    receiveEmails?: boolean;
    
    @IsBoolean()
    @IsOptional()
    receiveSMS?: boolean;
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsOptional()
    displayName?: string;

    @Type(() => CreateUserSettingsDto)
    @ValidateNested()
    @IsOptional()
    settings?: CreateUserSettingsDto;
}

// no agregamos avatarUrl porque cuando te creas la cuenta no es necesario.
