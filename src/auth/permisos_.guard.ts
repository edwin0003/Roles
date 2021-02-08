import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permiso } from 'src/permisos.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { PERMISOS_KEY } from './permisos.decorator';

@Injectable()
export class PermisosGuard implements CanActivate {
  constructor(private reflector: Reflector,private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext):Promise< boolean> {
    const [permiso] = this.reflector.getAllAndOverride<Permiso[]>(PERMISOS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!permiso) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const userRoles= await this.prisma.user.findUnique({where:{id:user.id},include:{rol:{include:{Persimos:true}}}})
    console.log(userRoles.rol.Persimos);
    console.log(permiso)
    if (userRoles.rol.Persimos.filter((p)=>p.name==permiso).length) {
      return true
    } else {
      throw new UnauthorizedException({message: "Usuario no Autorizado"});
    }
    //return requiredRoles.some((P1) => user.Persimos?.includes(p2=>{p2.name== P1}));
    //return true
  }
}