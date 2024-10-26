import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { DELETE_INVESTER } from "./InvesterApiRoute";

const deleteInvester = async (investerId: any) => {
  return await axiosAuth.delete(`${DELETE_INVESTER}/${investerId}`);
};

export const useDeleteInvester = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) =>
  useMutation<any, AxiosError, any>({
    mutationFn: deleteInvester,
    ...queryParams,
  });
