import * as Knex from 'knex';
// "heroku-postbuild": "cd client && npm i"

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return (
    knex
      .withSchema('work-time-tracker')
      .table('work_messages')
      .del()
      .then(() => {
        return knex.withSchema('work-time-tracker').table('work_entries').del();
      })
      .then(() => {
        return knex.withSchema('work-time-tracker').table('users').del();
      })
      .then(() => {
        return knex.withSchema('work-time-tracker').table('companies').del();
      })

      .then(() => {
        return knex.raw('TRUNCATE TABLE work_messages, work_entries, users, companies CASCADE');
      })
      // .then(() => {
      //   return knex.withSchema('work-time-tracker').table('work_messages').truncate();
      // })
      // .then(() => {
      //   return knex.withSchema('work-time-tracker').table('work_entries').truncate();
      // })
      // .then(() => {
      //   return knex.withSchema('work-time-tracker').table('users').truncate();
      // })
      // .then(() => {
      //   return knex.withSchema('work-time-tracker').table('companies').truncate();
      // })
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
            {
              userId: 2,
              password: 'someRandomPasswordToBeChanged',
              companyId: 1,
              email: 'katja.tcharni@gmail.com',
              firstName: 'Katja',
              lastName: 'Tcharni',
              admin: false,
              resetPasswordToken: null,
            },
            {
              userId: 3,
              password: 'someRandomPasswordToBeChanged',
              companyId: 1,
              email: 'r_t88@msn.com',
              firstName: 'Romppu',
              lastName: 'Tcharni',
              admin: false,
              resetPasswordToken: null,
            },
          ]);
      })
  );
}
