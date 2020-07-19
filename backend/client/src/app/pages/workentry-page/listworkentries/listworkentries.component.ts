import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAndCompany } from '../../../../../../../models/user';
import { UserService } from '../../../services/user.service';
import { WorkEntryService } from '../../../services/workentry.service';
import { WorkEntry } from '../../../../../../../models';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { Constants } from '../../../../../../../utils';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditworkentrybottomsheetComponent } from './editworkentrybottomsheet/editworkentrybottomsheet.component';
import { BottomSheetActionResult } from 'src/app/frontend-models/frontend.models';

@Component({
  selector: 'app-listworkentries',
  templateUrl: './listworkentries.component.html',
  styleUrls: ['./listworkentries.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
      transition(
        'expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ListworkentriesComponent implements OnInit {
  private user: UserAndCompany = null;
  // workEntries: WorkEntry[] = [];
  dataSource = new MatTableDataSource<WorkEntry>([]);
  columnsToDisplay = []; // ['title', 'details', 'date', 'charged']
  expandedElement: WorkEntry | null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private workEntryService: WorkEntryService,
    private bottomSheet: MatBottomSheet
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(`list work entries IN INIT`);

    this.user = this.userService.getUser();
    if (this.user?.userId) {
      this.columnsToDisplay = this.user?.config.listWorkEntriesTableHeaderFields;
      this.dataSource.data = await this.getWorkEntries(this.user.userId);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleMoreIconClick(workEntry: WorkEntry): void {
    console.log(workEntry);
    this.bottomSheet
      .open(EditworkentrybottomsheetComponent, { data: workEntry })
      .afterDismissed()
      .subscribe(async (result: BottomSheetActionResult) => {
        console.log(result);
        switch (result.action) {
          case 'addComment':
            break;
          case 'editEntry':
            break;
          case 'deleteEntry':
            if (result.workEntry?.workEntryId) {
              const index = this.dataSource.data.findIndex(
                (entry) => entry.workEntryId === result.workEntry?.workEntryId
              );
              this.dataSource.data.splice(index, 1);
              this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
            }
            break;
        }
      });
  }

  displayTableHeader(field: string): string {
    switch (field) {
      case 'title':
        return 'Title';
      case 'details':
        return 'Details';
      case 'customerName':
        return 'Customer';
      case 'costCents':
        return 'Cost';
      case 'date':
        return 'Date';
      case 'startTime':
        return 'Start';
      case 'endTime':
        return 'End';
      case 'breakMIN':
        return 'Break';
      case 'charged':
        return 'Charged';
      case 'comments':
        return 'Comments';
    }
  }

  displayTableData(
    data: string | string[] | number | boolean,
    field: string
  ): any {
    switch (field) {
      case 'title':
        return data;
      case 'details':
        return data;
      case 'customerName':
        return data;
      case 'costCents':
        return (data as number) / 100;
      case 'date':
        return data
          ? moment(data as string).format(Constants.DATEFORMAT)
          : null;
      case 'startTime':
        return data
          ? moment(data as string).format(Constants.DATEANDTIMEFORMAT)
          : null;
      case 'endTime':
        return data
          ? moment(data as string).format(Constants.DATEANDTIMEFORMAT)
          : null;
      case 'breakMIN':
        return data;
      case 'charged':
        return data === true ? 'Yes' : 'No';
      case 'comments':
        // How to display array of comment in one line !?
        // Show last comment
        return data ? data[(data as string[]).length - 1] : null;
    }
  }

  displayExpandedData(element: WorkEntry, field: string): string {
    if (!this.user.config.listWorkEntriesTableHeaderFields.includes(field)) {
      switch (field) {
        case `title`:
          return `Title: ${element.title}`;
        case `details`:
          return `Details: ${element.details}`;
        case `customerName`:
          return `Customer: ${element.customerName}`;
        case `costCents`:
          return `Cost: ${element.costCents / 100}`;
        case `date`:
          return `Date: ${
            element.date
              ? moment(element.date).format(Constants.DATEFORMAT)
              : null
          }`;
        case `startTime`:
          return `Start: ${
            element.startTime
              ? moment(element.startTime).format(Constants.DATEANDTIMEFORMAT)
              : null
          }`;
        case `endTime`:
          return `End: ${
            element.endTime
              ? moment(element.endTime).format(Constants.DATEANDTIMEFORMAT)
              : null
          }`;
        case `breakMIN`:
          return `Break: ${element.breakMIN}`;
        case `charged`:
          return `Charged: ${element.charged ? 'Yes' : 'No'}`;
        case 'comments':
          return element.comments ? element.comments.join('\n') : null;
      }
    }
  }

  async getWorkEntries(
    userId: number,
    from?: string,
    to?: string
  ): Promise<WorkEntry[]> {
    const workEntries = await this.workEntryService.getWorkEntry(
      userId,
      undefined,
      this.user.companyId,
      from,
      to
    );
    console.log(workEntries);
    return workEntries;
  }
}
