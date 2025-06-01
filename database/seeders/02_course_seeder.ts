import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Course from '#models/course';

export default class extends BaseSeeder {
  async run() {
    await Course.createMany([
      {
        name: 'Introduction to Programming',
        description: 'Learn the basics of programming using Python.',
        code: 'CS01',
      },
      {
        name: 'Web Development',
        description: 'Build modern web applications using HTML, CSS, and JavaScript.',
        code: 'CS02',
      },
      {
        name: 'Data Science',
        description: 'Analyze and visualize data using Python and R.',
        code: 'CS03',
      },
      {
        name: 'Machine Learning',
        description: 'Understand the fundamentals of machine learning algorithms.',
        code: 'CS04',
      },
      {
        name: 'Circuit Analysis',
        description: 'Study the principles of electrical circuits and components.',
        code: 'EE01',
      },
      {
        name: 'Electromagnetism',
        description: 'Explore the concepts of electromagnetism and its applications.',
        code: 'EE02',
      },
      {
        name: 'Control Systems',
        description: 'Learn about control systems and their applications in engineering.',
        code: 'EE03',
      },
      {
        name: 'Power Systems',
        description: 'Understand the design and operation of electrical power systems.',
        code: 'EE04',
      },
    ]);
  }
}
