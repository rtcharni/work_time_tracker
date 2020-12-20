import { Company } from '../../models';

export const mockCompanies: Company[] = [
  {
    companyId: 1,
    name: 'company Y',
    companyEmail: 'bas@gmail.com',
    config: {
      listWorkEntriesTableHeaderFields: ['title', 'date', 'charged'],
      workEntryFields: ['title', 'details', 'customerName', 'date', 'startTime', 'endTime', 'breakMIN', 'charged'],
      expandedListWorkEntryFields: ['details', 'customerName', 'costCents', 'startTime', 'endTime', 'breakMIN', 'charged'],
    },
  },
  {
    companyId: 2,
    name: 'company A',
    companyEmail: 'bar@gmail.com',
    config: {
      listWorkEntriesTableHeaderFields: ['title', 'date', 'charged'],
      workEntryFields: ['title', 'details', 'customerName', 'date', 'startTime', 'endTime', 'breakMIN', 'charged'],
      expandedListWorkEntryFields: ['details', 'customerName', 'costCents', 'startTime', 'endTime', 'breakMIN', 'charged'],
    },
  },
  {
    companyId: 3,
    name: 'company BB',
    companyEmail: 'foo@gmail.com',
    config: {
      listWorkEntriesTableHeaderFields: ['title', 'date', 'charged'],
      workEntryFields: ['title', 'details', 'customerName', 'date', 'startTime', 'endTime', 'breakMIN', 'charged'],
      expandedListWorkEntryFields: ['details', 'customerName', 'costCents', 'startTime', 'endTime', 'breakMIN', 'charged'],
    },
  },
  {
    companyId: 4,
    name: 'company OOO',
    companyEmail: 'foofee@gmail.com',
    config: {
      listWorkEntriesTableHeaderFields: ['title', 'date', 'charged'],
      workEntryFields: ['title', 'details', 'customerName', 'date', 'startTime', 'endTime', 'breakMIN', 'charged'],
      expandedListWorkEntryFields: ['details', 'customerName', 'costCents', 'startTime', 'endTime', 'breakMIN', 'charged'],
    },
  },
  {
    companyId: 5,
    name: 'company QWER',
    companyEmail: 'asdf@gmail.com',
    config: {
      listWorkEntriesTableHeaderFields: ['title', 'date', 'charged'],
      workEntryFields: ['title', 'details', 'customerName', 'date', 'startTime', 'endTime', 'breakMIN', 'charged'],
      expandedListWorkEntryFields: ['details', 'customerName', 'costCents', 'startTime', 'endTime', 'breakMIN', 'charged'],
    },
  },
];
