import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Language Table
export const languages = pgTable('languages', {
  id: serial('id').primaryKey(),
  language: varchar('language', { length: 100 }).notNull().unique(),
  languageCode: varchar('language_code', { length: 10 }).notNull(),
  imageSrc: text('image_src').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const languageRelations = relations(languages, ({ many }) => ({
  classes: many(classes),
}))

// Companies Table
export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  companyName: varchar('company_name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const companyRelations = relations(companies, ({ many }) => ({
  students: many(students),
}))

// Course Levels Enum
export const levelEnum = pgEnum('level_enum', [
  'beginner',
  'elementary',
  'pre-intermediate',
  'intermediate',
  'upper-intermediate',
  'advanced',
])

// Classes Table
export const classes = pgTable('classes', {
  id: serial('id').primaryKey(),
  classNumber: varchar('class_number', { length: 20 }).notNull().unique(),
  languageId: integer('language_id')
    .references(() => languages.id, { onDelete: 'restrict' })
    .notNull(),
  level: levelEnum('level').notNull(),
  courseId: integer('course_id')
    .references(() => courses.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const classRelations = relations(classes, ({ one, many }) => ({
  language: one(languages, {
    fields: [classes.languageId],
    references: [languages.id],
  }),
  course: one(courses, {
    fields: [classes.courseId],
    references: [courses.id],
  }),
  students: many(students),
}))

// Students Table
export const students = pgTable('students', {
  clerkUserId: varchar('clerk_user_id', { length: 255 }).primaryKey(), // Use Clerk ID as primary key
  studentName: varchar('student_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  companyId: integer('company_id').references(() => companies.id, {
    onDelete: 'cascade',
  }),
  classId: integer('class_id').references(() => classes.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const studentRelations = relations(students, ({ one }) => ({
  company: one(companies, {
    fields: [students.companyId],
    references: [companies.id],
  }),
  class: one(classes, {
    fields: [students.classId],
    references: [classes.id],
  }),
}))

// Courses Table
export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  courseName: varchar('course_name', { length: 255 }).notNull(),
  level: levelEnum('level').notNull(),
  courseObjectives: text('course_objectives').notNull(),
  languageId: integer('language_id') // Course has a language
    .references(() => languages.id, { onDelete: 'restrict' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const courseRelations = relations(courses, ({ one, many }) => ({
  language: one(languages, {
    fields: [courses.languageId],
    references: [languages.id],
  }),
  classes: many(classes),
  units: many(units),
}))

// Units Table
export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id')
    .references(() => courses.id, { onDelete: 'cascade' })
    .notNull(),
  unitNumber: integer('unit_number').notNull(), // 1-4
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const unitRelations = relations(units, ({ one, many }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}))

// Lesson Types Enum
export const lessonTypeEnum = pgEnum('lesson_type', [
  'grammar',
  'vocabulary',
  'communication',
])

// Lessons Table
export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  unitId: integer('unit_id')
    .references(() => units.id, { onDelete: 'cascade' })
    .notNull(),
  lessonType: lessonTypeEnum('lesson_type').notNull(),
  lessonObjectives: text('lesson_objectives').notNull(),
  activities: jsonb('activities').notNull(), // JSON-based activities
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const lessonRelations = relations(lessons, ({ one }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
}))
