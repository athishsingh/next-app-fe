import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axios.interceptor";

export type AxiosOptionType = {
  config: AxiosRequestConfig<never> | undefined;
};

export const getData = async <D>(path: string, options?: AxiosOptionType) => {
  try {
    const { config } = options || {};
    const data = await axiosInstance.get<void, D>(path, config);
    return data;
  } catch (e) {
    throw e;
  }
};

export const postData = async <D, T>(
  path: string,
  requestData?: D,
  options?: AxiosOptionType
) => {
  try {
    const { config } = options || {};
    const data = await axiosInstance.post<void, T>(path, requestData, config);
    return data;
  } catch (e) {
    throw e;
  }
};

export const patchData = async <D>(
  path: string,
  requestData?: D,
  options?: AxiosOptionType
) => {
  try {
    const { config } = options || {};
    const data = await axiosInstance.patch<void, unknown>(
      path,
      requestData,
      config
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const putData = async <D>(
  path: string,
  requestData: D,
  options?: AxiosOptionType
) => {
  try {
    const { config } = options || {};
    const data = await axiosInstance.put<void, unknown>(
      path,
      requestData,
      config
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const deleteData = async <D>(
  path: string,
  requestData?: D,
  options?: AxiosOptionType
) => {
  try {
    const { config } = options || {};
    const data = await axiosInstance.delete<void, unknown>(path, {
      ...config,
      data: requestData,
    });
    return data;
  } catch (e) {
    throw e;
  }
};
