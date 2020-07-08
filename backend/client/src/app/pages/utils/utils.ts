import Axios, { AxiosResponse } from 'axios';
import {
  UserCredentials,
  LoginResponse,
  WorkEntry,
} from '../../../../../../models';

export class Utils {
  static colors: Record<string, string> = {
    white: '#ffffff',
    pink: '#FBEAEB',
    blue: '#2F3C7E',
    black: '#000000',
  };
}
// Get from ENV ?!
// function createDefaults() {
//   const instanse = Axios.create({
//     baseURL: `http://localhost:3000/api/`,
//     timeout: 20000,
//     withCredentials: true,
//   });
//   instanse.interceptors.response.use((res: AxiosResponse<any>) => {
//     if (res.data?.redirectToLogin) {
//       // REDIRECTED!
//       window.location.replace("http://localhost:3000");
//     }
//     return res;
//   });
//   return instanse;
// }

// export class AxiosUtils {
//   static axios = createDefaults();

//   static loginUser(userCredentials: UserCredentials) {
//     return this.axios.post<LoginResponse>(`auth/login`, userCredentials, {});
//   }

//   static addWorkEntry(workEntry: WorkEntry) {
//     return AxiosUtils.axios.post<WorkEntry>(
//       `database/workentries`,
//       workEntry,
//       {}
//     );
//   }
// }
