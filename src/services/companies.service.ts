import { Company } from '@models';
import { mockCompanies } from '@mockdata';
import { Queries } from './database.queries';

export class CompaniesService {
  static async getCompanies(companyId: number): Promise<Company[]> {
    if (process.env.REALDATA) {
      return await Queries.getCompanies(companyId ? [companyId] : undefined);
    } else {
      return companyId ? mockCompanies.filter(x => x.companyId === companyId) : mockCompanies;
    }
  }
}
