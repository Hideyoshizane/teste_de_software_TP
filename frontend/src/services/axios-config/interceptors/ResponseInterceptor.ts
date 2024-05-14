import { AxiosResponse } from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  //Todos os dados que poderia receter deveria ser tratado aqui
  return response;
};