import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WorkEntry, WorkMessage, WorkMessageAndUser } from '@models';

@Injectable({
  providedIn: 'root',
})
export class WorkMessageService {
  constructor(private http: HttpClient) {}

  public async getWorkMessages(
    workMessageId?: number,
    userId?: number,
    companyId?: number,
    workEntryId?: number,
    from?: string,
    to?: string,
    joinusers?: boolean
  ): Promise<WorkMessage[] | WorkMessageAndUser[]> {
    const params: HttpParams = this.constructParamsForGetWorkMessages(
      workMessageId,
      userId,
      companyId,
      workEntryId,
      from,
      to,
      joinusers
    );
    const res = await this.http
      .get<WorkMessage[] | WorkMessageAndUser[]>(`/api/database/workmessages`, { params })
      .toPromise();
    return res;
  }

  public async editWorkMessage(workMessage: WorkMessage): Promise<WorkMessage> {
    const res = await this.http
      .put<WorkMessage[]>(`/api/database/workmessages/${workMessage.workMessageId}`, { workMessage: workMessage.workMessage })
      .toPromise();
    return res.length ? res[0] : null;
  }

  public async addWorkMessage(workMessage: WorkMessage): Promise<WorkMessage> {
    const res = await this.http.post<WorkMessage[]>(`/api/database/workmessages`, workMessage).toPromise();
    return res.length ? res[0] : null;
  }

  public async deleteWorkMessage(workMessageId: number): Promise<WorkMessage> {
    const res = await this.http.delete<WorkMessage[]>(`/api/database/workmessages/${workMessageId}`).toPromise();
    return res.length ? res[0] : null;
  }

  private constructParamsForGetWorkMessages(
    workMessageId?: number,
    userId?: number,
    companyId?: number,
    workEntryId?: number,
    from?: string,
    to?: string,
    joinusers?: boolean
  ): HttpParams {
    let params = new HttpParams();
    params = workMessageId ? params.set('workMessageId', workMessageId.toString()) : params;
    params = userId ? params.set('userId', userId.toString()) : params;
    params = companyId ? params.set('companyId', companyId.toString()) : params;
    params = workEntryId ? params.set('workEntryId', workEntryId.toString()) : params;
    params = from ? params.set('from', from) : params;
    params = to ? params.set('to', to) : params;
    params = joinusers ? params.set('joinusers', joinusers.toString()) : params;
    return params;
  }
}
