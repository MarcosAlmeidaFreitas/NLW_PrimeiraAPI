// foi instalado uma biblioteca chama @faker-js com o comando pnpm i @faker-js/faker -D
import { db } from "./client.ts"
import { courses, enrollments, users } from "./schema.ts"
import { fakerPT_BR as faker} from '@faker-js/faker'

async function seed() {
  const usersInsert = await db.insert(users).values([
    {name: faker.person.fullName(), email: faker.internet.email()},
    {name: faker.person.fullName(), email: faker.internet.email()},
    {name: faker.person.fullName(), email: faker.internet.email()},
    {name: faker.person.fullName(), email: faker.internet.email()},
    {name: faker.person.fullName(), email: faker.internet.email()},
    {name: faker.person.fullName(), email: faker.internet.email()},
  ]).returning()

  const coursesInsert = await db.insert(courses).values([
    {title: 'Curso de Java', description: 'Quem programa em java é gay'},
    {title: 'Curso de Node.js', description: 'O melhor aprendizado é na rocketseat'},
    {title: 'Curso de React', description: 'Tudo para o seu front-end'},
    {title: 'Curso de SQL', description: 'De delete sem where em produção kkkk'},
    {title: 'Curso de JavaScript', description: 'Aprenda a programar do zero'},
    {title: 'Curso de TypeScript', description: 'O futuro do JavaScript'},
    {title: 'Curso de Python', description: 'Aprenda a programar com Python e pegue na cobra kkkk'},
    {title: 'Curso de HTML', description: 'Aprenda a estruturar suas páginas web'},
    {title: 'Curso de CSS', description: 'Para colorir o seu mundo, huummm gay'},
  ]).returning()

  await db.insert(enrollments).values([
    { userId: usersInsert[0].id, coursesId: coursesInsert[0].id },
    { userId: usersInsert[1].id, coursesId: coursesInsert[0].id },
    { userId: usersInsert[2].id, coursesId: coursesInsert[1].id },
    { userId: usersInsert[3].id, coursesId: coursesInsert[1].id },
    { userId: usersInsert[4].id, coursesId: coursesInsert[1].id },
    { userId: usersInsert[5].id, coursesId: coursesInsert[2].id },
  ])
}

seed()