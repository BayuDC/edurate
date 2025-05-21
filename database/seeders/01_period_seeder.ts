import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { DateTime } from 'luxon';

import Period from '#models/period';

export default class extends BaseSeeder {
  async run() {
    await Period.createMany([
      {
        name: 'Semester Gasal 2023/2024',
        startDate: DateTime.fromISO('2023-07-01'),
        endDate: DateTime.fromISO('2023-12-31'),
      },
      {
        name: 'Semester Genap 2023/2024',
        startDate: DateTime.fromISO('2024-01-01'),
        endDate: DateTime.fromISO('2024-06-30'),
      },
      {
        name: 'Semester Gasal 2024/2025',
        startDate: DateTime.fromISO('2024-07-01'),
        endDate: DateTime.fromISO('2024-12-31'),
      },
      {
        name: 'Semester Genap 2024/2025',
        startDate: DateTime.fromISO('2025-01-01'),
        endDate: DateTime.fromISO('2025-06-30'),
      },
    ]);
  }
}
