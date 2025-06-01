import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'student_courses';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('period_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('periods')
        .onDelete('RESTRICT');
      table
        .integer('student_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE');
      table
        .integer('course_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('courses')
        .onDelete('RESTRICT');
      table
        .integer('teacher_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('teachers')
        .onDelete('RESTRICT');

      table.unique(['student_id', 'course_id']);

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
