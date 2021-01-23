import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {

    await prisma.rol.create({data:{name:"cliente"}})
    await prisma.rol.create({data:{name:"admin"}})
    await prisma.rol.create({data:{name:"root"}})
  const newUser = await prisma.user.create({
    data: {
        username:"ecm123",
        email: "ecm@gmail.com",
        password: "12345",
        rol:{connect: {name: "root"}},
        Persimos: {create:[{name:"crear_usuario"}, {name:"actualizar_usuario"}, {name:"eliminar_usuario"},{name:"listar_usuario"},{name:"ver_usuario"}]}
    }
  })
  console.log(`new user created`, newUser.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })