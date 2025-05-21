import { BaseSeeder } from '@adonisjs/lucid/seeders';
import User from '#models/user';

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        username: 'admin',
        password: 'admin',
        email: 'admin@kampus.local',
        role: 'admin',
      },
      {
        username: 'admin1',
        password: 'admin1',
        email: 'admin1@kampus.local',
        role: 'admin',
      },
      {
        username: 'admin2',
        password: 'admin2',
        email: 'admin2@kampus.local',
        role: 'admin',
      },
      {
        username: 'student',
        password: 'student',
        email: 'student@kampus.local',
        role: 'student',
      },
      {
        username: 'teacher',
        password: 'teacher',
        email: 'teacher@kampus.local',
        role: 'teacher',
      },
    ]);
    // Write your database queries inside the run method
  }
}
// import { BaseSeeder } from '@adonisjs/lucid/seeders';
