import axios from 'axios';
import { responseInterceptor, errorInterceptor } from './interceptors';
import {Environment} from '../../shared-components/environment';

const Api = axios.create({
    baseURL: Environment.URL_BASE,
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
  );

  //Estou disponibilizando a API para ser usada em outros lugares
  export { Api };