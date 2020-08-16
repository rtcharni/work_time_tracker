import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { UserAndCompany } from '../../../../../models/user';
import { UserService } from '../../services/user.service';
import { WorkEntryService } from '../../services/workentry.service';
import { WorkEntry } from '../../../../../models';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { Constants } from '../../../../../utils';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditworkentrybottomsheetComponent } from './editworkentrybottomsheet/editworkentrybottomsheet.component';
import { BottomSheetActionResult } from '../../frontend-models/frontend.models';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-listworkentries',
  templateUrl: './listworkentries.component.html',
  styleUrls: ['./listworkentries.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListworkentriesComponent implements OnInit, OnChanges {
  @Output() workEntriesChangedEvent = new EventEmitter<WorkEntry[]>();

  private user: UserAndCompany = null;
  // On-going month on init
  startDate: Date = moment().date(1).toDate();
  endDate: Date = new Date();
  dataSource = new MatTableDataSource<WorkEntry>([]);
  columnsToDisplay = [];
  expandedElement: WorkEntry | null;

  @Input() usersIds: number[];
  @Input() useInputUsers: boolean;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService, private workEntryService: WorkEntryService, private bottomSheet: MatBottomSheet) {}

  async ngOnInit(): Promise<void> {
    console.log(`list work entries IN INIT`);
    this.user = this.userService.getUser();

    const usersToUse = this.useInputUsersOrLoggedInUser();
    if (usersToUse) {
      this.getEntriesAndRenderTable(
        this.user.config.listWorkEntriesTableHeaderFields,
        usersToUse,
        this.user.companyId,
        this.startDate,
        this.endDate
      );
    } else {
      this.dataSource.data = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.usersIds.currentValue && !changes.usersIds.firstChange) {
      if (!this.user) {
        this.user = this.userService.getUser();
      }

      const usersToUse = this.useInputUsersOrLoggedInUser();
      if (usersToUse) {
        this.getEntriesAndRenderTable(
          this.user.config.listWorkEntriesTableHeaderFields,
          usersToUse,
          this.user.companyId,
          this.startDate,
          this.endDate
        );
      } else {
        this.dataSource.data = [];
      }
    }
  }

  async getEntriesAndRenderTable(headerFields: string[], userId: number[], companyId: number, start: Date, end: Date): Promise<void> {
    this.columnsToDisplay = headerFields;
    this.dataSource.data = await this.workEntryService.getWorkEntries(
      userId,
      undefined,
      companyId,
      moment(start).add(12, 'hour').toISOString(),
      moment(end).add(12, 'hour').toISOString()
    );
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.workEntriesChangedEvent.emit(this.dataSource.data);
  }

  handleDateChange(startOrEnd: 'start' | 'end', event: MatDatepickerInputEvent<Date>): void {
    this.startDate = startOrEnd === 'start' ? event.value : this.startDate;
    this.endDate = startOrEnd === 'end' ? event.value : this.endDate;
    if (startOrEnd === 'end' && this.startDate && this.endDate) {
      const usersToUse = this.useInputUsersOrLoggedInUser();
      if (usersToUse) {
        this.getEntriesAndRenderTable(
          this.user.config.listWorkEntriesTableHeaderFields,
          usersToUse,
          this.user.companyId,
          this.startDate,
          this.endDate
        );
      } else {
        // do nothing !? empty!
        this.dataSource.data = [];
      }
    }
  }

  useInputUsersOrLoggedInUser(): number[] {
    let usersToUse: number[];
    if (this.useInputUsers) {
      if (this.usersIds?.length) {
        usersToUse = this.usersIds;
      } else {
        // show empty
        usersToUse = null;
      }
    } else {
      // No input user, use logged in user
      usersToUse = [this.user.userId];
    }
    return usersToUse;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleMoreIconClick(workEntry: WorkEntry): void {
    console.log(workEntry);
    this.bottomSheet
      .open(EditworkentrybottomsheetComponent, {
        data: {
          workEntry,
          workFormFields: this.user.config.workEntryFields,
          userAndCompany: this.user,
        },
      })
      .afterDismissed()
      .subscribe(async (result?: BottomSheetActionResult) => {
        console.log(result);
        switch (result?.action) {
          case 'addComment':
            break;
          case 'editEntry':
            if (result?.workEntry) {
            }
            break;
          case 'deleteEntry':
            if (result?.workEntry?.workEntryId) {
              const index = this.dataSource.data.findIndex(entry => entry.workEntryId === result.workEntry?.workEntryId);
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
      // case 'comments':
      //   return 'Comments';
    }
  }

  displayTableData(data: string | string[] | number | boolean, field: string): any {
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
        return data ? moment(data as string).format(Constants.DATEFORMAT) : null;
      case 'startTime':
        return data ? moment(data as string).format(Constants.DATEANDTIMEFORMAT) : null;
      case 'endTime':
        return data ? moment(data as string).format(Constants.DATEANDTIMEFORMAT) : null;
      case 'breakMIN':
        return data;
      case 'charged':
        return data === true ? 'Yes' : 'No';
      // case 'comments':
      // How to display array of comment in one line !?
      // Show last comment
      // Refactor, ugly as hell ...
      // return data ? data[(data as string[]).length - 1].split(';')[2] : null;
    }
  }

  displayExpandedData(element: WorkEntry, field: string): string {
    switch (field) {
      case `title`:
        return `Title: ${element.title ?? ''}`;
      case `details`:
        return `Details: ${element.details ?? ''}`;
      case `customerName`:
        return `Customer: ${element.customerName ?? ''}`;
      case `costCents`:
        return `Cost: ${element.costCents ? element.costCents / 100 : ''}`;
      case `date`:
        return `Date: ${element.date ? moment(element.date).format(Constants.DATEFORMAT) : ''}`;
      case `startTime`:
        return `Start: ${element.startTime ? moment(element.startTime).format(Constants.DATEANDTIMEFORMAT) : ''}`;
      case `endTime`:
        return `End: ${element.endTime ? moment(element.endTime).format(Constants.DATEANDTIMEFORMAT) : ''}`;
      case `breakMIN`:
        return `Break: ${element.breakMIN ?? ''} ${element.breakMIN ? 'min' : ''}`;
      case `charged`:
        return `Charged: ${element.charged ? 'Yes' : 'No'}`;
      // case 'comments':
      //   const comm = `\nComments:\n`;
      //   const formattedComments = element.comments?.map((comment) => {
      //     const split = comment.split(';');
      //     const time = moment(split[0]).format(Constants.DATEANDTIMEFORMAT);
      //     return `${time} - ${split[1]}: ${split[2]}`;
      //   });
      //   return formattedComments ? comm + formattedComments.join('\n') : comm;
    }
  }
}
