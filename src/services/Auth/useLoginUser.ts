import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { LOGIN_USER } from "./AuthApiRoutes";

const loginUser = async (data: any) => {
  return await axiosAuth.post(LOGIN_USER, data);
};

export const useLoginUser = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) =>
  useMutation<any, AxiosError, any>({
    mutationFn: loginUser,
    ...queryParams,
  });
