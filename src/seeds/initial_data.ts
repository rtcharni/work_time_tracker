import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex
    .withSchema('work-time-tracker')
    .table('work_entries')
    .del()
    .then(() => {
      return knex.withSchema('work-time-tracker').table('users').del();
    })
    .then(() => {
      return knex.withSchema('work-time-tracker').table('companies').del();
    })
    .then(() => {
      // Inserts companies
      return knex
        .withSchema('work-time-tracker')
        .table('companies')
        .insert([
          {
            companyId: 1,
            name: 'Roman Super Company Oy',
            email: 'roman.tcharni@gmail.com',
            config: `{"listWorkEntriesTableHeaderFields":["title", "date", "charged"],"workEntryFields":["title","details","customerName","costCents","date","startTime","endTime","breakMIN","charged"],"expandedListWorkEntryFields":["details","customerName","costCents","startTime","endTime","breakMIN","charged"]}`,
            // config: `{"listWorkEntriesTableHeaderFields":["title", "date", "charged"],"workEntryFields":["title","details","customerName","costCents","date","startTime","endTime","breakMIN","charged"],"expandedListWorkEntryFields":["details","customerName","costCents","startTime","endTime","breakMIN","charged","comments"]}`,
          },
        ]);
    })
    .then(() => {
      // Inserts users
      return knex
        .withSchema('work-time-tracker')
        .table('users')
        .insert([
          {
            userId: 1,
            password: 'someRandomPasswordToBeChanged',
            companyId: 1,
            email: 'roman.tcharni@gmail.com',
            firstName: 'Roman',
            lastName: 'Tcharni',
            admin: true,
            resetPasswordToken: null,
          },
        ]);
    });
}
