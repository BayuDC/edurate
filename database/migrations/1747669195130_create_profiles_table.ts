import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'profiles';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('user_id')
        .unsigned()
        .primary()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');

      table.text('address').nullable();
      table.enum('gender', ['Male', 'Female']).nullable();
      table.date('birth_date').nullable();
      table.string('birth_place').nullable();
      table.string('phone').nullable();
      table.string('avatar').nullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
