import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {
  Config,
  UserCredentials,
  LoginResponse,
  User,
  WorkEntry,
} from '../../../../../models';

@Injectable({
  providedIn: 'root',
})
export class WorkEntryService {
  //   private workEntries = null;
  private lastAddedOrEditedEntry = null;
  private contentTypeHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public async getWorkEntry(
    userId?: number,
    workEntryId?: number,
    companyId?: number,
    from?: string,
    to?: string
  ): Promise<WorkEntry[]> {
    const params: HttpParams = this.constructParamsForGetWorkEntry(
      userId,
      workEntryId,
      companyId,
      from,
      to
    );
    const res = await this.http
      .get<WorkEntry[]>(`/api/database/workentries`, { params })
      .toPromise();
    return res;
  }

  public async editWorkEntry(workEntry: WorkEntry): Promise<WorkEntry> {
    const res = await this.http
      .put<WorkEntry[]>(
        `/api/database/workentries/${workEntry.workEntryId}`,
        workEntry
      )
      .toPromise();
    this.lastAddedOrEditedEntry = res.length ? res[0] : null;
    return res.length ? res[0] : null;
  }

  public async addWorkEntry(workEntry: WorkEntry): Promise<WorkEntry> {
    const res = await this.http
      .post<WorkEntry[]>(`/api/database/workentries`, workEntry)
      .toPromise();
    this.lastAddedOrEditedEntry = res.length ? res[0] : null;
    return res.length ? res[0] : null;
  }

  public async deleteWorkEntry(workEntryId: number): Promise<WorkEntry> {
    const res = await this.http
      .delete<WorkEntry[]>(`/api/database/workentries/${workEntryId}`)
      .toPromise();
    return res.length ? res[0] : null;
  }

  private constructParamsForGetWorkEntry(
    userId?: number,
    workEntryId?: number,
    companyId?: number,
    from?: string,
    to?: string
  ): HttpParams {
    let params = new HttpParams();
    params = userId ? params.set('userId', userId.toString()) : params;
    params = workEntryId
      ? params.set('workEntryId', workEntryId.toString())
      : params;
    params = companyId ? params.set('companyId', companyId.toString()) : params;
    params = from ? params.set('from', from) : params;
    params = to ? params.set('to', to) : params;
    return params;
  }
}
