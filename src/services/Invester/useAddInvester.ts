import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { ADD_INVESTER } from "./InvesterApiRoute";

const addInvester = async (data: any) => {
  return await axiosAuth.post(ADD_INVESTER, data);
};

export const useAddInvester = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) =>
  useMutation<any, AxiosError, any>({
    mutationFn: addInvester,
    ...queryParams,
  });
