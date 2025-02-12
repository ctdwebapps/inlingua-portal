import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'

// Language Table
export const languages = pgTable('languages', {
  id: serial('id').primaryKey(),
  language: varchar('language', { length: 100 }).notNull().unique(),
  imageSrc: text('image_src').notNull(),
})

export const languageRelations = relations(languages, ({ many }) => ({
  classes: many(classes),
  courses: many(courses),
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
  'Starter',
  'Elementary',
  'Pre-intermediate',
  'Intermediate',
  'Upper-intermediate',
  'Advanced',
])

// Classes Table
export const classes = pgTable('classes', {
  id: serial('id').primaryKey(),
  classNumber: varchar('class_number', { length: 20 }).notNull().unique(),
  languageId: integer('language_id')
    .references(() => languages.id, { onDelete: 'cascade' })
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
    .references(() => languages.id, { onDelete: 'cascade' })
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
  units: many(units), // Ensure this relation exists to link courses to units
}))

// Units Table
export const units = pgTable(
  'units',
  {
    id: serial('id').primaryKey(),
    courseId: integer('course_id')
      .references(() => courses.id, { onDelete: 'cascade' })
      .notNull(),
    unitNumber: integer('unit_number').notNull(), // 1-4
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    uniqueUnitPerCourse: unique('unique_unit_per_course').on(
      table.courseId,
      table.unitNumber
    ),
  })
)

export const unitRelations = relations(units, ({ one, many }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}))

// Lesson Types Enum
export const lessonTypeEnum = pgEnum('lesson_type', [
  'Grammar',
  'Vocabulary',
  'Communication',
])

// Lessons Table
export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  unitId: integer('unit_id')
    .references(() => units.id, { onDelete: 'cascade' })
    .notNull(),
  lessonType: lessonTypeEnum('lesson_type').notNull(),
  lessonObjectives: text('lesson_objectives').notNull(),
  pointsAwarded: integer('points_awarded').default(0), // Points earned for completing this lesson
  completed: boolean('completed').default(false), // Track if the lesson is fully completed
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const lessonRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  activities: many(activities),
}))

export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  lessonId: integer('lesson_id')
    .references(() => lessons.id, { onDelete: 'cascade' })
    .notNull(),
  type: text('type').notNull(), // e.g., "TrueFalse", "MultipleChoice", "FillInTheBlank"
  description: text('description').notNull(),
  points: integer('points').default(10),
  activityName: text('activity_name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const activityRelations = relations(activities, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [activities.lessonId],
    references: [lessons.id],
  }),
  questions: many(questions),
}))

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  activityId: integer('activity_id')
    .references(() => activities.id, { onDelete: 'cascade' })
    .notNull(),
  question: text('question').notNull(),
  answer: jsonb('answer').notNull(), // Correct answer
  choices: jsonb('choices').default(sql`NULL`), // Only for MultipleChoice
  isCorrect: boolean('is_correct').default(sql`NULL`), // Student's result, default NULL
  userAnswer: text('user_answer').default(sql`NULL`), // Student's response, default NULL
})

export const questionRelations = relations(questions, ({ one }) => ({
  activity: one(activities, {
    fields: [questions.activityId],
    references: [activities.id],
  }),
}))

export const studentActivities = pgTable('student_activities', {
  id: serial('id').primaryKey(),
  studentId: varchar('student_id', { length: 255 }) // Clerk ID
    .references(() => students.clerkUserId, { onDelete: 'cascade' })
    .notNull(),
  activityId: integer('activity_id')
    .references(() => activities.id, { onDelete: 'cascade' })
    .notNull(),
  isCompleted: boolean('is_completed').default(false), // Whether student finished it
  score: integer('score').default(0), // Points earned
  userAnswers: jsonb('user_answers').default([]), // Stores student's answers
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
