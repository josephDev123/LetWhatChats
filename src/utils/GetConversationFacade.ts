import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { axiosDefault } from "../lib/axios/axiosInstance";

interface UseQueryFacadeOptions<TQueryFnData, TError, TData>
  extends UseQueryOptions<TQueryFnData, TError, TData> {}

export function useQueryFacade<TQueryFnData, TError, TData = TQueryFnData>(
  queryKey: any[],
  url: string,
  options?: UseQueryFacadeOptions<TQueryFnData, TError, TData>
): UseQueryResult<TData, TError> & { refresh: () => void } {
  const query = useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn: async () => {
      const response = await axiosDefault.get(url);
      return response.data.data;
    },
    ...options,
  });

  const refresh = () => {
    query.refetch();
  };

  return {
    ...query,
    refresh,
  };
}
