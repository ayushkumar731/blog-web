/* eslint-disable max-len */
import { Component } from 'react';
import Cookie from 'universal-cookie';
import axios, { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';

const cookies = new Cookie();

interface AxiosInstance {
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
}

class AxiosApi extends Component<AxiosInstance> {
  service: any;

  constructor(props: any) {
    super(props);
    const API_URL_CALL = process.env.NODE_ENV === 'production'
      ? 'http://localhost:3001'
      : 'http://localhost:3001';
    const service = axios.create({
      baseURL: API_URL_CALL,
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess = (res: Response | any) => res;

  handleError = (error: Error | any) => {
    switch (error.response.status) {
      case 401:
        this.redirectTo();
        cookies.remove('x-access-token');
        break;

      case 404:
        break;
      default:
        break;
    }
    return Promise.reject(error);
  };

  redirectTo = () => {
    window.location.href = '/';
  };

  get(path: string) {
    const token = cookies.get('x-access-token');
    return this.service
      .get(path, {
        header: {
          accept: 'application/json',
          'x-access-token': token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        },
      })
      .then((response: any) => Promise.resolve(response))
      .catch((error: Error | any) => error.response);
  }

  post(path: string, payload: any) {
    const token = cookies.get('x-access-token');
    return this.service
      .request({
        method: 'POST',
        url: path,
        responseType: 'json',
        data: payload,
        headers: {
          accept: 'application/json',
          'x-access-token': token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        },
      })
      .then((response: any) => response)
      .catch((error: any) => error.response);
  }

  patch(path: string, payload: any) {
    const token = cookies.get('x-access-token');
    return this.service
      .request({
        method: 'PATCH',
        url: path,
        responseType: 'json',
        data: payload,
        headers: {
          accept: 'application/json',
          'x-access-token': token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        },
      })
      .then((response: any) => response)
      .catch((error: any) => error.response);
  }
}

export default new AxiosApi('axios');
