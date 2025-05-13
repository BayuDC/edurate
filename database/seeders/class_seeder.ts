import { BaseSeeder } from '@adonisjs/lucid/seeders';

import Class from '#models/class';

export default class extends BaseSeeder {
  async run() {
    await Class.createMany([
      {
        name: 'Kelas A',
        periodId: 4,
      },
      {
        name: 'Kelas B',
        periodId: 4,
      },
      {
        name: 'Kelas C',
        periodId: 4,
      },
      {
        name: 'Kelas D',
        periodId: 4,
      },
    ]);
  }
}
