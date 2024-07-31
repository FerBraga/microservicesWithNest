import { Optional } from '@nestjs/common';
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    readonly category: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsArray()
    @ArrayMinSize(1)
    readonly events: Array<Event>;
}


export interface Event extends Document {
    name: string,
    operation: string,
    value: number
}