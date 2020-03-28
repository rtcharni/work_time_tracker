import { Config } from "./config";

export interface Company {
  companyId: number; // PK
  name: string;
  email: string;
  config: Config;
}
