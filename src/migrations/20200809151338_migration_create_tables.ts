import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createSchema('work-time-tracker')
    .withSchema('work-time-tracker')
    .createTable('companies', t => {
      t.increments('companyId').primary().notNullable();
      t.string('name', 255).notNullable();
      t.string('email', 255).notNullable();
      t.json('config');
    })
    .createTable('users', t => {
      t.increments('userId').primary().notNullable();
      t.string('password', 255).notNullable();
      t.integer('companyId').notNullable().references('companyId').inTable('work-time-tracker.companies').index();
      t.string('email', 255);
      t.string('firstName', 255);
      t.string('lastName', 255);
      t.boolean('admin').defaultTo(false);
      t.text('resetPasswordToken');
      t.boolean('disabled').defaultTo(false);
    })
    .createTable('work_entries', t => {
      t.increments('workEntryId').primary().notNullable();
      t.integer('companyId').notNullable().references('companyId').inTable('work-time-tracker.companies').index();
      t.integer('userId').notNullable().references('userId').inTable('work-time-tracker.users').index();
      t.string('title', 255);
      t.text('details');
      t.string('customerName', 255);
      t.timestamp('startTime', { useTz: true });
      t.timestamp('endTime', { useTz: true });
      t.integer('breakMIN');
      t.boolean('charged');
      t.date('date');
      t.boolean('locked').defaultTo(false);
      t.bigInteger('costCents');
    })
    .createTable('work_messages', t => {
      t.increments('workMessageId').primary().notNullable();
      t.integer('companyId').notNullable().references('companyId').inTable('work-time-tracker.companies').index();
      t.integer('userId').notNullable().references('userId').inTable('work-time-tracker.users').index();
      t.integer('workEntryId').notNullable().references('workEntryId').inTable('work-time-tracker.work_entries').index();
      t.text('workMessage').notNullable();
      t.timestamp('createdAt', { useTz: true }).notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema
    .withSchema('work-time-tracker')
    .dropTableIfExists('work_messages')
    .dropTableIfExists('work_entries')
    .dropTableIfExists('users')
    .dropTableIfExists('companies')
    .dropSchemaIfExists('work-time-tracker');
}
