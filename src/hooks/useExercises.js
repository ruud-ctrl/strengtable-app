import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";
// If you can access the underlying React Query client directly:
import { useQueryClient } from "@tanstack/react-query";

const LIST_KEY = ["exercises"];
const SINGLE_KEY = (id) => ["exercise", id];

export const useExercises = () => {
  const setSuccess = useSuccessSnackbar();
  const setError = useErrorSnackbar();
  const qc = useQueryClient?.(); // works if your wrapper uses RQ under the hood

  // ---- LIST QUERY ----
  const exercises = useGetQuery(LIST_KEY, "/exercise");

  // ---- UPDATE (PUT) ----
  const mutateExercise = usePutMutation(
    ["exercise", "update"],
    ({ id }) => `/exercise/${id}`,
    {
      onMutate: (qcLocal, { id, payload }) => {
        const client = qc ?? qcLocal;
        const prevSingle = client.getQueryData(SINGLE_KEY(id));
        const prevList = client.getQueryData(LIST_KEY);

        if (prevSingle) client.setQueryData(SINGLE_KEY(id), { ...prevSingle, ...payload });
        if (prevList) {
          client.setQueryData(
            LIST_KEY,
            prevList.map((ex) => (ex.id === id ? { ...ex, ...payload } : ex))
          );
        }

        return {
          rollback: () => {
            if (prevSingle) client.setQueryData(SINGLE_KEY(id), prevSingle);
            if (prevList) client.setQueryData(LIST_KEY, prevList);
          },
        };
      },
      invalidations: [LIST_KEY],
      onSuccess: () => setSuccess("Exercise updated"),
      onError: (_err, _vars, ctx) => {
        ctx?.rollback?.();
        setError("Failed to update exercise");
      },
    }
  );

  // ---- CREATE (POST) ----
  const createExercise = usePostMutation(
    ["exercise", "create"],
    "/exercise",
    {
      onMutate: (qcLocal, { payload }) => {
        const client = qc ?? qcLocal;
        const prevList = client.getQueryData(LIST_KEY) || [];

        const tempId = `temp-${Date.now()}`;
        const tempItem = { id: tempId, ...payload };

        client.setQueryData(LIST_KEY, [tempItem, ...prevList]);

        return {
          tempId,
          prevList,
          rollback: () => client.setQueryData(LIST_KEY, prevList),
        };
      },
      onSuccess: (serverItem, _vars, ctx) => {
        // Replace temp item with server item if we have it
        if (!qc) return; // If no direct client, the invalidation below will refresh
        const current = qc.getQueryData(LIST_KEY) || [];
        const replaced = current.map((ex) => (ex.id === ctx?.tempId ? serverItem : ex));
        qc.setQueryData(LIST_KEY, replaced);
        // also set single cache for immediate reads
        if (serverItem?.id) qc.setQueryData(SINGLE_KEY(serverItem.id), serverItem);
        setSuccess("Exercise added");
      },
      // Fallback: always ensure fresh data
      invalidations: [LIST_KEY],
      onError: (_err, _vars, ctx) => {
        ctx?.rollback?.();
        setError("Failed to add exercise");
      },
    }
  );

  // ---- DELETE (DELETE) ----
  const removeExercise = useDeleteMutation(
    ["exercise", "delete"],
    ({ id }) => `/exercise/${id}`,
    {
      onMutate: (qcLocal, { id }) => {
        const client = qc ?? qcLocal;
        const prevList = client.getQueryData(LIST_KEY) || [];
        const prevSingle = client.getQueryData(SINGLE_KEY(id));

        client.setQueryData(LIST_KEY, prevList.filter((ex) => ex.id !== id));
        try { client.setQueryData(SINGLE_KEY(id), undefined); } catch {}

        return {
          rollback: () => {
            client.setQueryData(LIST_KEY, prevList);
            if (prevSingle) client.setQueryData(SINGLE_KEY(id), prevSingle);
          },
        };
      },
      invalidations: [LIST_KEY],
      onSuccess: () => setSuccess("Exercise deleted"),
      onError: (_err, _vars, ctx) => {
        ctx?.rollback?.();
        setError("Failed to delete exercise");
      },
    }
  );

  const updateExercise = async (id, payload) => mutateExercise({ id, payload });
  const addExercise    = async (payload)     => createExercise(payload);
  const deleteExercise = async (id)          => removeExercise({ id });

  return { exercises, addExercise, updateExercise, deleteExercise };
};
