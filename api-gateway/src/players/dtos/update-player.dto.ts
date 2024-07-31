import { Optional } from '@nestjs/common';
import { IsEmail, IsOptional } from 'class-validator'

export class UpdatePlayerDto {
    @Optional()
    readonly phoneNumber: string;

    @IsOptional()
    @IsEmail()
    readonly email: string;

    @Optional()
    readonly name: string;
}   