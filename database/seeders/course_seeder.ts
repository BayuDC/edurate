import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Course from '#models/course';

export default class extends BaseSeeder {
  async run() {
    await Course.createMany([
      {
        name: 'Introduction to Programming',
        description: 'Learn the basics of programming using Python.',
        code: 'TI31',
      },
      {
        name: 'Web Development',
        description: 'Build modern web applications using HTML, CSS, and JavaScript.',
        code: 'TI32',
      },
      {
        name: 'Data Science',
        description: 'Analyze and visualize data using Python and R.',
        code: 'TI33',
      },
      {
        name: 'Machine Learning',
        description: 'Understand the fundamentals of machine learning algorithms.',
        code: 'TI34',
      },
    ]);
  }
}
