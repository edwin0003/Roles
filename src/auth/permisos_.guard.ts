import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permiso } from 'src/permisos.enum';
import { PERMISOS_KEY } from './permisos.decorator';

@Injectable()
export class PermisosGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Permiso[]>(PERMISOS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    console.log(requiredRoles)
    if (user.Persimos.filter((p)=>p.name==requiredRoles[0]).length) {
      return true
    } else {
      throw new UnauthorizedException({message: "Usuario no Autorizado"});
    }
    //return requiredRoles.some((P1) => user.Persimos?.includes(p2=>{p2.name== P1}));
    //return true
  }
}