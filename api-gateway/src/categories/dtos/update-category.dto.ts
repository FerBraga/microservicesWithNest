import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator'
import { Event } from './create-category.dto';

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    readonly category: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    readonly events: Array<Event>;
}   