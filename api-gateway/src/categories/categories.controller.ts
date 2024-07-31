import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxyService } from 'src/proxyrmq/client-proxy';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { ValidationParametersPipe } from 'src/common/pipes/parameters-validation.pipe';

@Controller('api/v1/categories')
export class CategoriesController {

    constructor(
        private clientAdmin: ClientProxyService
    ) {
    }

    private clientAdmingBackEnd = this.clientAdmin.getClientProxyAdminBackEndInstance()


    @Post('/')
    @UsePipes(ValidationPipe)
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        this.clientAdmingBackEnd.emit('create-category', createCategoryDto)
    }

    @Get('/list')
    getCategories(@Query('id') _id: string): Observable<any> {
        return this.clientAdmingBackEnd.send('get-categories', _id ? _id : '')
    }

    @Put('/edit/:id')
    @UsePipes(ValidationPipe)
    updateCategory(@Body() updateCategoryDto: UpdateCategoryDto, @Param('id', ValidationParametersPipe) id: string): Observable<any> {
        return this.clientAdmingBackEnd.emit('update-category', { id, category: updateCategoryDto })
    }
}
