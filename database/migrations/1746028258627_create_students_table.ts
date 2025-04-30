import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'students';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('code').notNullable().unique();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
