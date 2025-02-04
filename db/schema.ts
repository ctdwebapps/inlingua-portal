import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const languages = pgTable('languages', {
  id: serial('id').primaryKey(),
  language: varchar('language', { length: 100 }).notNull().unique(), // Prevents excessively long names
  languageCode: varchar('language_code', { length: 10 }).notNull(), // Standardized short codes
  imageSrc: text('image_src').notNull(), // URLs may vary in length
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// export const companies = pgTable('companies', {
//   id: serial('id').primaryKey(),
//   companyName: varchar('company_name', { length: 255 }).notNull(),
//   createdAt: timestamp('created_at').defaultNow(),
//   updatedAt: timestamp('updated_at').defaultNow(),
// })

// export const levelEnum = pgEnum('level_enum', [
//   'beginner',
//   'elementary',
//   'pre-intermediate',
//   'intermediate',
//   'upper-intermediate',
//   'advanced',
// ])

// export const classes = pgTable('classes', {
//   id: serial('id').primaryKey(),
//   classNumber: varchar('class_number', { length: 20 }).notNull().unique(),
//   languageId: integer('language_id').references(() => languages.id, {
//     onDelete: 'restrict',
//   }),
//   level: levelEnum('level').notNull(), // Uses the defined enum
//   courseId: integer('course_id').references(() => courses.id, {
//     onDelete: 'cascade',
//   }),
//   createdAt: timestamp('created_at').defaultNow(),
//   updatedAt: timestamp('updated_at').defaultNow(),
// })

// export const students = pgTable('students', {
//   id: serial('id').primaryKey(),
//   clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull().unique(), // Links to Clerk
//   studentName: varchar('student_name', { length: 255 }).notNull(),
//   email: varchar('email', { length: 255 }).notNull().unique(),
//   companyId: integer('company_id').references(() => companies.id, {
//     onDelete: 'cascade',
//   }),
//   classId: integer('class_id').references(() => classes.id, {
//     onDelete: 'set null',
//   }),
//   createdAt: timestamp('created_at').defaultNow(),
//   updatedAt: timestamp('updated_at').defaultNow(),
// })

// export const courses = pgTable('courses', {
//   id: serial('id').primaryKey(),
//   courseName: varchar('course_name', { length: 255 }).notNull(),
//   level: levelEnum('level').notNull(), // Uses the defined enum
//   courseObjectives: text('course_objectives').notNull(),
//   createdAt: timestamp('created_at').defaultNow(),
//   updatedAt: timestamp('updated_at').defaultNow(),
// })

// export const units = pgTable('units', {
//   id: serial('id').primaryKey(),
//   courseId: integer('course_id').references(() => courses.id, {
//     onDelete: 'cascade',
//   }),
//   level: levelEnum('level').notNull(), // Uses the defined enum
//   unitNumber: integer('unit_number').notNull(), // 1-4
//   createdAt: timestamp('created_at').defaultNow(),
//   updatedAt: timestamp('updated_at').defaultNow(),
// })

// export const lessonTypeEnum = pgEnum('lesson_type', [
//   'grammar',
//   'vocabulary',
//   'communication',
// ])

// export const lessons = pgTable('lessons', {
//   id: serial('id').primaryKey(),
//   level: levelEnum('level').notNull(), // Uses the defined enum
//   lessonObjectives: text('lesson_objectives').notNull(),
//   unitId: integer('unit_id').references(() => units.id, {
//     onDelete: 'cascade',
//   }),
//   lessonType: lessonTypeEnum('lesson_type').notNull(), // "grammar", "vocabulary", "communication"
//   activities: jsonb('activities').notNull(), // JSON-based activities
//   createdAt: timestamp('created_at').defaultNow(),
//   updatedAt: timestamp('updated_at').defaultNow(),
// })
