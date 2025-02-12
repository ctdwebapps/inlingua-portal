import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

import * as schema from '../db/schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

const main = async () => {
  try {
    console.log('Seeding database')

    await db.delete(schema.languages)
    await db.delete(schema.companies)
    await db.delete(schema.courses)
    await db.delete(schema.classes)
    await db.delete(schema.units)
    await db.delete(schema.lessons)
    await db.delete(schema.activities)
    // await db.delete(schema.questions)
    // await db.delete(schema.students)
    // await db.delete(schema.studentActivities)

    //INSERT LANGUAGES
    await db.insert(schema.languages).values([
      {
        id: 1,
        language: 'English',
        imageSrc: 'en.svg',
      },
      {
        id: 2,
        language: 'Thai',
        imageSrc: 'th.svg',
      },
      {
        id: 3,
        language: 'Chinese',
        imageSrc: 'zh.svg',
      },
      {
        id: 4,
        language: 'Japanese',
        imageSrc: 'ja.svg',
      },
      {
        id: 5,
        language: 'French',
        imageSrc: 'fr.svg',
      },
      {
        id: 6,
        language: 'German',
        imageSrc: 'de.svg',
      },
      {
        id: 7,
        language: 'Korean',
        imageSrc: 'ko.svg',
      },
      {
        id: 8,
        language: 'Italian',
        imageSrc: 'it.svg',
      },
      {
        id: 9,
        language: 'Spanish',
        imageSrc: 'es.svg',
      },
    ])

    //INSERT COMPANIES
    await db.insert(schema.companies).values([
      {
        id: 1,
        companyName: 'Frasers',
      },
    ])

    //INSERT COURSES
    await db.insert(schema.courses).values([
      {
        id: 1,
        courseName: 'Presentations 1',
        level: 'Elementary',
        courseObjectives: 'Learn presentations basics',
        languageId: 1,
      },
      {
        id: 2,
        courseName: 'Intermediate Thai',
        level: 'Intermediate',
        courseObjectives: 'Learn Intermediate Thai',
        languageId: 2,
      },
    ])

    //INSERT CLASSES
    await db.insert(schema.classes).values([
      {
        id: 1,
        classNumber: 'OL1111',
        languageId: 1,
        level: 'Elementary',
        courseId: 1,
      },
      {
        id: 2,
        classNumber: 'OL2222',
        languageId: 2,
        level: 'Intermediate',
        courseId: 2,
      },
    ])

    //INSERT UNITS
    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        unitNumber: 1,
      },
      {
        id: 2,
        courseId: 1,
        unitNumber: 2,
      },
      {
        id: 3,
        courseId: 1,
        unitNumber: 3,
      },
      {
        id: 4,
        courseId: 1,
        unitNumber: 4,
      },
      {
        id: 5,
        courseId: 2,
        unitNumber: 1,
      },
      {
        id: 6,
        courseId: 2,
        unitNumber: 2,
      },
      {
        id: 7,
        courseId: 2,
        unitNumber: 3,
      },
      {
        id: 8,
        courseId: 2,
        unitNumber: 4,
      },
    ])

    //INSERT LESSONS
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        lessonType: 'Grammar',
        lessonObjectives: 'Learn grammar 1',
        pointsAwarded: 0,
        completed: false,
      },
      {
        id: 2,
        unitId: 1,
        lessonType: 'Vocabulary',
        lessonObjectives: 'Learn vocabulary 1',
        pointsAwarded: 0,
        completed: false,
      },
      {
        id: 3,
        unitId: 1,
        lessonType: 'Communication',
        lessonObjectives: 'Learn Communication 1',
        pointsAwarded: 0,
        completed: false,
      },
      {
        id: 4,
        unitId: 2,
        lessonType: 'Grammar',
        lessonObjectives: 'Learn grammar 2',
        pointsAwarded: 0,
        completed: false,
      },
      {
        id: 5,
        unitId: 2,
        lessonType: 'Vocabulary',
        lessonObjectives: 'Learn vocabulary 3',
        pointsAwarded: 0,
        completed: false,
      },
      {
        id: 6,
        unitId: 2,
        lessonType: 'Communication',
        lessonObjectives: 'Learn communication 3',
        pointsAwarded: 0,
        completed: false,
      },
      {
        id: 7,
        unitId: 3,
        lessonType: 'Grammar',
        lessonObjectives: 'Learn grammar 1',
        pointsAwarded: 0,
        completed: false,
      },
    ])

    //INSERT ACTIVITIES
    await db.insert(schema.activities).values([
      {
        id: 1,
        lessonId: 1,
        description: 'Choose True or False',
        points: 10,
        type: 'TrueFalse',
        activityName: 'True or false question',
      },
      {
        id: 2,
        lessonId: 1,
        description: 'What is the capital of France?',
        points: 10,
        type: 'FillInTheBlank',
        activityName: 'Fill in the blank question',
      },
      {
        id: 3,
        lessonId: 1,
        description: 'Choose the correct answer for each question.',
        points: 10,
        type: 'MultipleChoice',
        activityName: 'Choose the correct',
      },
    ])

    //INSERT QUESTIONS
    await db.insert(schema.questions).values([
      {
        id: 1,
        activityId: 1,
        question: 'Is the sky blue?',
        answer: true, // Boolean for True/False questions
        choices: null,
        isCorrect: null,
        userAnswer: null,
      },
      {
        id: 2,
        activityId: 1,
        question: 'Is the sun cold?',
        answer: false, // Boolean for True/False questions
        choices: null,
        isCorrect: null,
        userAnswer: null,
      },
      {
        id: 3,
        activityId: 2,
        question: 'The capital of France is _______',
        answer: 'Paris', // String for text-based questions
        choices: ['Paris', 'London', 'Berlin', 'Rome'], // Multiple choice options
        isCorrect: null,
        userAnswer: null,
      },
      {
        id: 4,
        activityId: 2,
        question: '2 plus 2 is _______',
        answer: ['4', 'Four', 'four'], // Multiple possible correct answers
        choices: null, // Multiple choice options
        isCorrect: null,
        userAnswer: null,
      },
      {
        id: 5,
        activityId: 3,
        question: 'Yesterday I ________ football.',
        answer: 'played', // Multiple possible correct answers
        choices: ['play', 'playing', 'played', 'plays'], // Multiple choice options
        isCorrect: null,
        userAnswer: null,
      },
    ])

    //INSERT STUDENTS
    await db.insert(schema.students).values([
      {
        clerkUserId: 'user_2sWlToUSDmDyXxfm4RKP52okvWq',
        studentName: 'Richard B',
        email: 'richardb@inlinguabangkok.com',
        companyId: 1, // Make sure this company ID exists in the `companies` table
        classId: 1, // Make sure this class ID exists in the `classes` table
      },
    ])

    console.log('Seeding finished')
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed the database')
  }
}

// call the function
main()
