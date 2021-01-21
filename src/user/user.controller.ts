import { PermisosGuard } from './../auth/permisos_.guard';
import { Permisos } from './../auth/permisos.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Permiso } from 'src/permisos.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Permisos(Permiso.crear_usuario)
  @Post()
  create(@Body() createUserDto: any) {
    return this.userService.create(createUserDto);
  }
 
 
  @Permisos(Permiso.listar_usuario)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Permisos(Permiso.ver_usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Permisos(Permiso.actulizar_usuario)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(id, updateUserDto);
  }
  @Permisos(Permiso.eliminar_usuario)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
