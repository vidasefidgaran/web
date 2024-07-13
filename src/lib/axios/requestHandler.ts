import axios, { AxiosError, AxiosResponse } from "axios";
import { Logger } from "../logger";

const logger = Logger.get("HttpClients.ts");

type BaseRequest<T, V> = (params?: T) => Promise<AxiosResponse<V>>;

export type SuccessResponse<V> = {
  code: "success";
  data: V;
};

export type ErrorResponse<E = AxiosError> = {
  code: "error";
  error: string;
};

type BaseResponse<V, E = AxiosError> = SuccessResponse<V> | ErrorResponse<E>;

export const requestHandler =
  <T, V, E = AxiosError>(request: BaseRequest<T, V>) =>
  async (params?: T): Promise<BaseResponse<V, E>> => {
    try {
      const response = await request(params);
      return { code: "success", data: response.data };
    } catch (e) {
      const error = e as E;
      logger.error(error.message, error);  // Log the error
      return { code: "error", error: error.message };
    }
  };

  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  //@ts-ignore



