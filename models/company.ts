import { Config } from './config';

export interface Company {
  companyId: number; // PK
  name: string;
  companyEmail: string;
  config: Config;
}
