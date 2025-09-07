import { pgTable, text, uuid, timestamp, uniqueIndex, pgEnum } from 'drizzle-orm/pg-core'

export const userRole = pgEnum('user_role', [
  'student',
  'manager',
])

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  role: userRole().notNull().default('student'),
})

export const courses = pgTable('courses', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull().unique(),
  description: text(), 
})

export const enrollments = pgTable('enrollments', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull().references(() => users.id),
  coursesId: uuid().notNull().references(() => courses.id),
  createdAt: timestamp({withTimezone: true}).notNull().defaultNow(),
}, table => [
  // definindo uma chave única composta para evitar que um usuário se inscreva no mesmo curso mais de uma vez
  uniqueIndex().on(table.userId, table.coursesId)
])