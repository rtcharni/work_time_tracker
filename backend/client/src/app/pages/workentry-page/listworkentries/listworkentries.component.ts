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

@Component({
  selector: 'app-listworkentries',
  templateUrl: './listworkentries.component.html',
  styleUrls: ['./listworkentries.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ListworkentriesComponent implements OnInit {
  private user: UserAndCompany = null;
  // workEntries: WorkEntry[] = [];
  dataSource = new MatTableDataSource<WorkEntry>([]);
  columnsToDisplay = ['title', 'details', 'date'];
  expandedElement: WorkEntry | null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private workEntryService: WorkEntryService
  ) {}

  async ngOnInit(): Promise<void> {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    console.log(`list work entries IN INIT`);
    this.user = this.userService.getUser();
    if (this.user?.userId) {
      this.dataSource.data = await this.getWorkEntries(this.user.userId);
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
