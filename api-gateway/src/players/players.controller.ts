import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { ValidationParametersPipe } from 'src/common/pipes/parameters-validation.pipe'
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { ClientProxyService } from 'src/proxyrmq/client-proxy';

@Controller('api/v1/players')
export class PlayersController {

    constructor(
        private clientAdmin: ClientProxyService
    ) {
    }

    private clientAdmingBackEnd = this.clientAdmin.getClientProxyAdminBackEndInstance()

    @Post('/')
    @UsePipes(ValidationPipe)
    createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
        this.clientAdmingBackEnd.emit('create-player', createPlayerDto);
    }

    @Put('/edit/:id')
    @UsePipes(ValidationPipe)
    updatePlayer(@Body() updatePlayer: UpdatePlayerDto, @Param('id', ValidationParametersPipe) id: string) {
        this.clientAdmingBackEnd.emit('update-player', { id, player: updatePlayer });
    }

    @Get('/list')
    getPlayers(): void {
        this.clientAdmingBackEnd.emit('get-players', {});
    }

    @Get('/show/:id')
    findPlayer(@Param('id', ValidationParametersPipe) id: string) {
        this.clientAdmingBackEnd.emit('show-player', { id });
    }

    @Delete('/delete/:id')
    deletePlayer(@Param('id', ValidationParametersPipe) id: string): void {
        this.clientAdmingBackEnd.emit('delete-player', { id });
    }
}
