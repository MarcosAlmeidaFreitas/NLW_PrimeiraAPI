/** biome-ignore-all lint/style/noMagicNumbers: <explanation> */
import { faker } from "@faker-js/faker";
import { db } from "../../database/client.ts";
import { courses } from "../../database/schema.ts";

// a criação de um curso automática recebe um titulo para que seja possível localizar o curso posteriormente em rotas que precisam
// testar se o curso foi realmente criado. 
export async function makeCourse(title?:string) {
  const result = await db.insert(courses).values({
    title: title ?? faker.lorem.words(3),
    description: faker.lorem.words(2),
  }).returning();

  return result[0]
}
