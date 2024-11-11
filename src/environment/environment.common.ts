import { BASE_URL } from './environment.const';

export const commonEnvironment = {
  baseUrl: BASE_URL,

  //------------Authentication------------------//
  LOGIN: BASE_URL + 'api/v1/auth/login',
  REFRESH_TOKEN: BASE_URL + 'api/v1/auth/refresh-token',
};
