import { PermisosGuard } from './permisos_.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Permiso } from './../permisos.enum';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

export const PERMISOS_KEY = 'permiso';
export const Permisos = (...permiso: Permiso[]) => {
    return applyDecorators(
        SetMetadata(PERMISOS_KEY, permiso),
        UseGuards(JwtAuthGuard, PermisosGuard)
    )
  
}