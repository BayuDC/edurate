import { BaseSeeder } from '@adonisjs/lucid/seeders';

import Class from '#models/class';

export default class extends BaseSeeder {
  async run() {
    await Class.createMany([
      {
        name: 'Kelas A',
      },
      {
        name: 'Kelas B',
      },
      {
        name: 'Kelas C',
      },
      {
        name: 'Kelas D',
      },
      {
        name: 'Kelas E',
      },
    ]);
  }
}
