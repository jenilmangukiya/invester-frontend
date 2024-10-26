import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { axiosAuth } from "../../Auth";
import { INVESTER_LIST } from "./InvesterApiRoute";

interface UseGetUsersType {
  queryParams?: Omit<UseQueryOptions, "queryKey">;
  searchText?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortType?: string;
}

const getInvesterList = ({
  searchText,
  page,
  limit,
  sortBy,
  sortType,
}: {
  searchText?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortType?: string;
}) => {
  return axiosAuth.get(INVESTER_LIST, {
    params: {
      query: (searchText || "").trim(),
      limit: limit,
      page: page,
      sortBy: sortBy,
      sortType,
    },
  });
};

export const useGetInvesterList = ({
  queryParams,
  searchText,
  page,
  limit,
  sortBy,
  sortType,
}: UseGetUsersType): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["investerList", searchText, page, limit, sortBy, sortType],
    queryFn: () =>
      getInvesterList({ searchText, page, limit, sortBy, sortType }),
    select: (data: any) => data.data.data,
    ...queryParams,
  });
};
