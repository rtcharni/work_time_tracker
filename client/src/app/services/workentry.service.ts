import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { WorkEntry } from '@models';

@Injectable({
  providedIn: 'root',
})
export class WorkEntryService {
  //   private workEntries = null;
  private lastAddedOrEditedEntry: WorkEntry = null;
  private contentTypeHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public async getWorkEntries(
    userId?: number[],
    workEntryId?: number,
    companyId?: number,
    from?: string,
    to?: string
  ): Promise<WorkEntry[]> {
    const params: HttpParams = this.constructParamsForGetWorkEntry(userId, workEntryId, companyId, from, to);
    const res = await this.http
      .get<WorkEntry[]>(`/api/database/workentries`, { params })
      .toPromise();
    return res;
  }

  public async editWorkEntry(workEntry: WorkEntry): Promise<WorkEntry> {
    const res = await this.http.put<WorkEntry[]>(`/api/database/workentries/${workEntry.workEntryId}`, workEntry).toPromise();
    this.lastAddedOrEditedEntry = res.length ? res[0] : null;
    return this.lastAddedOrEditedEntry;
  }

  public async addWorkEntry(workEntry: WorkEntry): Promise<WorkEntry> {
    const res = await this.http.post<WorkEntry[]>(`/api/database/workentries`, workEntry).toPromise();
    this.lastAddedOrEditedEntry = res.length ? res[0] : null;
    return this.lastAddedOrEditedEntry;
  }

  public async deleteWorkEntry(workEntry: WorkEntry): Promise<WorkEntry> {
    const params = new HttpParams().set('userId', workEntry.userId.toString()).set('companyId', workEntry.companyId.toString());
    const res = await this.http
      .delete<WorkEntry[]>(`/api/database/workentries/${workEntry.workEntryId}`, { params })
      .toPromise();
    return res.length ? res[0] : null;
  }

  private constructParamsForGetWorkEntry(
    // userId?: number,
    userId?: number[],
    workEntryId?: number,
    companyId?: number,
    from?: string,
    to?: string
  ): HttpParams {
    let params = new HttpParams();
    if (userId && userId.length) {
      for (const user of userId) {
        params = params.append('userId[]', user.toString());
      }
    }
    params = workEntryId ? params.set('workEntryId', workEntryId.toString()) : params;
    params = companyId ? params.set('companyId', companyId.toString()) : params;
    params = from ? params.set('from', from) : params;
    params = to ? params.set('to', to) : params;
    return params;
  }
}
