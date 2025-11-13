// @utils/apiHooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@service/api";
import _ from "lodash";

const DEFAULT_HEADERS = { "Content-Type": "application/json" };

export function useGetQuery(key, url, map = _.identity) {
  return useGenericQuery(key, async () => {
    const { data } = await axiosInstance.get(url, { headers: DEFAULT_HEADERS });
    return map(data);
  });
}

export function usePostMutation(key, url, options = []) {
  return useGenericMutation(
    key,
    async (body) =>
      (await axiosInstance.post(_.isFunction(url) ? url(body) : url, body ?? null)).data,
    options
  );
}

export function usePutMutation(key, url, options=[]) {
  return useGenericMutation(
    key,
    async (body) => {
      const target = _.isFunction(url) ? url(body) : url;
      const { data } = await axiosInstance.put(target, body ?? null, { headers: DEFAULT_HEADERS });
      return data;
    },
    options
  );
}

export function useDeleteMutation(key, url, options = []) {
  return useGenericMutation(
    key,
    async (body) =>
      (await axiosInstance.delete(_.isFunction(url) ? url(body) : url, { data: body ?? null })).data,
    options
  );
}

function useGenericQuery(key, fn) {
  return useQuery({ queryKey: key, queryFn: fn, keepPreviousData: true });
}

function useGenericMutation(key, fn, invalidationsOrOptions) {
  const qc = useQueryClient();

  const options =
    Array.isArray(invalidationsOrOptions) || typeof invalidationsOrOptions === "function"
      ? { invalidations: invalidationsOrOptions }
      : (invalidationsOrOptions || {});

  const { invalidations, onMutate, onSuccess, onError } = options;

  const { mutateAsync } = useMutation({
    mutationKey: key,
    mutationFn: fn,

    onMutate: async (variables) => {
      if (!onMutate) return;
      await qc.cancelQueries();
      return await onMutate(qc, variables);
    },
    onError: (err, vars, ctx) => {
      if (ctx?.rollback) {
        try { ctx.rollback(); } catch {}
      }
      if (onError) onError(err, vars, ctx);
    },
    onSuccess: (data, vars, ctx) => {
      if (onSuccess) onSuccess(data, vars, ctx);

      if (typeof invalidations === "function") {
        invalidations(qc);
      } else if (Array.isArray(invalidations)) {
        invalidations.forEach((queryKey) => {
          qc.invalidateQueries({ queryKey });
        });
      }
    },
  });

  return mutateAsync;
}