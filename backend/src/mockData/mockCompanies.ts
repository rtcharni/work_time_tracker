import { Company } from "../../../models";

export const mockCompanies: Company[] = [
  {
    companyId: 1,
    name: "company Y",
    email: "bas@gmail.com",
    config: {
      listWorkEntriesTableHeaderFields: ["title", "date", "charged"],
      workEntryFields: [
        "title",
        "details",
        "customerName",
        "date",
        "startTime",
        "endTime",
        "breakMIN",
        "charged",
      ],
    },
  },
  {
    companyId: 2,
    name: "company A",
    email: "bar@gmail.com",
    config: {
      listWorkEntriesTableHeaderFields: ["title", "date", "charged"],
      workEntryFields: [
        "title",
        "details",
        "customerName",
        "date",
        "startTime",
        "endTime",
        "breakMIN",
        "charged",
      ],
    },
  },
  {
    companyId: 3,
    name: "company BB",
    email: "foo@gmail.com",
    config: {
      listWorkEntriesTableHeaderFields: ["title", "date", "charged"],
      workEntryFields: [
        "title",
        "details",
        "customerName",
        "date",
        "startTime",
        "endTime",
        "breakMIN",
        "charged",
      ],
    },
  },
  {
    companyId: 4,
    name: "company OOO",
    email: "foofee@gmail.com",
    config: {
      listWorkEntriesTableHeaderFields: ["title", "date", "charged"],
      workEntryFields: [
        "title",
        "details",
        "customerName",
        "date",
        "startTime",
        "endTime",
        "breakMIN",
        "charged",
      ],
    },
  },
  {
    companyId: 5,
    name: "company QWER",
    email: "asdf@gmail.com",
    config: {
      listWorkEntriesTableHeaderFields: ["title", "date", "charged"],
      workEntryFields: [
        "title",
        "details",
        "customerName",
        "date",
        "startTime",
        "endTime",
        "breakMIN",
        "charged",
      ],
    },
  },
];
