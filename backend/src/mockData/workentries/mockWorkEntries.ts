import { WorkEntry } from "../../../../models";

export const mockWorkEntries: WorkEntry[] = [
  {
    id: 1,
    companyId: 5,
    userId: 1,
    title: "App development",
    details: "Frontend app stater",
    customerName: "Sebu",
    breakMIN: 0,
    startTime: "2020-03-21T08:34:59.716Z",
    endTime: "2020-03-21T10:34:59.716Z"
  },
  {
    id: 2,
    companyId: 5,
    userId: 1,
    title: "Sell monitors",
    details: "Dell monitors",
    customerName: "Fujitsu",
    breakMIN: 30,
    startTime: "2020-03-22T06:00:59.716Z",
    endTime: "2020-03-22T10:00:59.716Z"
  },
  {
    id: 3,
    companyId: 5,
    userId: 1,
    title: "App development",
    details: "Backend fixing bugs",
    customerName: "Sebu",
    breakMIN: 20,
    startTime: "2020-03-22T12:34:59.716Z",
    endTime: "2020-03-22T14:34:59.716Z"
  },
  {
    id: 4,
    companyId: 6,
    userId: 2,
    title: "Fixing",
    details: "Fixing computers",
    customerName: "Toshiba",
    breakMIN: 0,
    startTime: "2020-03-23T08:34:59.716Z",
    endTime: "2020-03-23T10:34:59.716Z"
  },
  {
    id: 5,
    companyId: 6,
    userId: 2,
    title: "Cleaning",
    details: "Cleaning toilet",
    customerName: "Katja",
    breakMIN: 0,
    startTime: "2020-03-23T14:12:59.716Z",
    endTime: "2020-03-23T20:56:59.716Z"
  }
];
