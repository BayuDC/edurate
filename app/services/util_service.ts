import Period from '#models/period';

export class UtilService {
  async getActivePeriod() {
    const now = new Date();

    const period = await Period.query()
      .where('start_date', '<=', now)
      .andWhere('end_date', '>=', now)
      .first();

    if (!period) {
      throw new Error('No active period found');
    }

    return period;
  }
}
