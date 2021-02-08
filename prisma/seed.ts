import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const hash = bcrypt.hashSync('12345', 10);
// A `main` function so that we can use async/await
async function main() {
  await prisma.persimos.create({ data: { name: 'crear_usuario' } });
  await prisma.persimos.create({ data: { name: 'actualizar_usuario' } });
  await prisma.persimos.create({ data: { name: 'eliminar_usuario' } });
  await prisma.persimos.create({ data: { name: 'listar_usuario' } });
  await prisma.persimos.create({ data: { name: 'ver_usuario' } });

  await prisma.rol.create({
    data: {
      name: 'cliente',
      Persimos: {
        connect: [
          { name: 'listar_usuario' },
          { name: 'ver_usuario' },
        ],
      },
    },
  });
  await prisma.rol.create({ data: { name: 'admin',  Persimos: {
    connect: [
      { name: 'crear_usuario' },
      { name: 'actualizar_usuario' },
      { name: 'eliminar_usuario' },
      { name: 'listar_usuario' },
      { name: 'ver_usuario' },
    ],
  }, } });
  await prisma.rol.create({ data: { name: 'root',  Persimos: {
    connect: [
      { name: 'crear_usuario' },
      { name: 'actualizar_usuario' },
      { name: 'eliminar_usuario' },
      { name: 'listar_usuario' },
      { name: 'ver_usuario' },
    ],
  }, } });

  const newUser = await prisma.user.create({
    data: {
      username: 'ecm123',
      email: 'ecm@gmail.com',
      password: hash,
      rol: { connect: { name: 'root' } },
    },
  });
  console.log(`new user created`, newUser.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
