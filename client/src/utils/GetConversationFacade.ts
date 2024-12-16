import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

interface UseQueryFacadeOptions<TQueryFnData, TError, TData>
  extends UseQueryOptions<TQueryFnData, TError, TData> {}

export function useQueryFacade<TQueryFnData, TError, TData = TQueryFnData>(
  queryKey: any[],
  queryFn: () => Promise<TQueryFnData>,
  options?: UseQueryFacadeOptions<TQueryFnData, TError, TData>
): UseQueryResult<TData, TError> & { refresh: () => void } {
  const query = useQuery({
    queryKey,
    queryFn,
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
