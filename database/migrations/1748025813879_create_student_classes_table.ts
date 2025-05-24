import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'student_classes';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('student_id').unsigned();
      table.integer('class_id').unsigned();
      table
        .integer('period_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('periods')
        .onDelete('RESTRICT');

      table.foreign('student_id').references('id').inTable('students').onDelete('CASCADE');
      table.foreign('class_id').references('id').inTable('classes').onDelete('CASCADE');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
