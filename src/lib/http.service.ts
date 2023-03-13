import { Service } from "typedi";
import axios, { AxiosResponse } from "axios";

@Service()
export class HttpService {
  async get(url: string): Promise<AxiosResponse> {
    return axios.get(url);
  }

  async post(url: string, data: any): Promise<AxiosResponse> {
    return axios.post(url, data);
  }

  async put(url: string, data: any): Promise<AxiosResponse> {
    return axios.put(url, data);
  }

  async delete(url: string): Promise<AxiosResponse> {
    return axios.delete(url);
  }
}
