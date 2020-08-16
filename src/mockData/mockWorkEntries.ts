import { WorkEntry } from '../../models';

export const mockWorkEntries: WorkEntry[] = [
  {
    workEntryId: 1,
    companyId: 1,
    userId: 1,
    title: 'App development',
    details: 'Frontend app stater',
    customerName: 'Sebu',
    breakMIN: 0,
    startTime: '2020-03-21T08:34:59.716Z',
    endTime: '2020-03-21T10:34:59.716Z',
    date: '2020-03-21T08:34:59.716Z',
    charged: null,
    locked: false,
    costCents: 0,
    // comments: [],
  },
  {
    workEntryId: 2,
    companyId: 1,
    userId: 1,
    title: 'Sell monitors',
    details: 'Dell monitors',
    customerName: 'Fujitsu',
    breakMIN: 30,
    startTime: '2020-03-22T06:00:59.716Z',
    endTime: '2020-03-22T10:00:59.716Z',
    date: '2020-03-22T06:00:59.716Z',
    charged: true,
    locked: false,
    costCents: 300012,
    // comments: [],
  },
  {
    workEntryId: 3,
    companyId: 1,
    userId: 1,
    title: 'App development',
    details: 'Backend fixing bugs',
    customerName: 'Sebu',
    breakMIN: 20,
    startTime: '2020-03-22T12:34:59.716Z',
    endTime: '2020-03-22T14:34:59.716Z',
    date: '2020-03-22T12:34:59.716Z',
    charged: false,
    locked: false,
    costCents: null,
    // comments: [],
  },
  {
    workEntryId: 4,
    companyId: 1,
    userId: 1,
    title: 'Fixing',
    details: 'Fixing computers',
    customerName: 'Toshiba',
    breakMIN: 0,
    startTime: '2020-03-23T08:34:59.716Z',
    endTime: '2020-03-23T10:34:59.716Z',
    date: '2020-03-23T08:34:59.716Z',
    charged: false,
    locked: false,
    costCents: 10000,
    // comments: [],
  },
  {
    workEntryId: 5,
    companyId: 1,
    userId: 1,
    title: 'Cleaning',
    details: 'Cleaning toilet',
    customerName: 'Katja',
    breakMIN: null,
    startTime: '2020-03-23T14:12:59.716Z',
    endTime: '2020-03-23T20:56:59.716Z',
    date: '2020-03-23T14:12:59.716Z',
    charged: false,
    locked: false,
    costCents: 22000,
    // comments: [],
  },
];
