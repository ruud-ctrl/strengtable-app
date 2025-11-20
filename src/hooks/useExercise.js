import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useQueryClient } from "@tanstack/react-query";
import { useErrorSnackbar, useSuccessSnackbar } from "./useSnackbar";

const LIST_KEY = ["exercises"];
const SINGLE_KEY = (id) => ["exercise", id];

export const useExercise = (id) => {
    if (!id) {
        throw new Error("useExercise requires a id to be provided.");
    }

    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();
    const qc = useQueryClient?.();

    const exercise = useGetQuery(SINGLE_KEY(id), `/exercise/${id}`);

  const mutateExercise = usePutMutation(
    ["exercise", "update"],
    `/exercise/${id}`,
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

  const updateExercise = async (id, payload) => mutateExercise({ id, payload });

  return { exercise, updateExercise };
};
