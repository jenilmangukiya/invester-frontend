import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { EXTRACT_FILE_TEXT } from "./InvesterApiRoute";

const extractFileText = async (data: any) => {
  return await axiosAuth.post(EXTRACT_FILE_TEXT, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useExtractFileText = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) =>
  useMutation<any, AxiosError, any>({
    mutationFn: extractFileText,
    ...queryParams,
  });
