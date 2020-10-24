import * as Knex from 'knex';
import bcrypt from 'bcrypt';
import { Constants } from '../../utils';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries and reset PK sequence
  return knex
    .raw(
      'TRUNCATE TABLE "work-time-tracker".work_messages, "work-time-tracker".work_entries, "work-time-tracker".users, "work-time-tracker".companies CASCADE'
    )
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
    .then(async () => {
      const roman1 = await bcrypt.hash('adminadmin', Constants.SALTROUNDS);
      const katja = await bcrypt.hash('katjakatja', Constants.SALTROUNDS);
      const roman2 = await bcrypt.hash('useruser', Constants.SALTROUNDS);
      // Inserts users
      return knex
        .withSchema('work-time-tracker')
        .table('users')
        .insert([
          {
            // userId: 1,
            password: roman1,
            companyId: 1,
            email: 'roman.tcharni@gmail.com',
            firstName: 'Roman',
            lastName: 'Tcharni',
            admin: true,
            resetPasswordToken: null,
            disabled: false,
          },
          {
            // userId: 2,
            password: 'someRandomPasswordToBeChanged',
            companyId: 1,
            email: 'katja.tcharni@gmail.com',
            firstName: 'Katja',
            lastName: 'Tcharni',
            admin: false,
            resetPasswordToken: null,
            disabled: false,
          },
          {
            // userId: 3,
            password: roman2,
            companyId: 1,
            email: 'r_t88@msn.com',
            firstName: 'Romppu',
            lastName: 'Tcharni',
            admin: false,
            resetPasswordToken: null,
            disabled: false,
          },
        ]);
    });
}
