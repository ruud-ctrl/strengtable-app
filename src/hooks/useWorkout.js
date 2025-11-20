import { usePutMutation, useGetQuery, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";
import { useQueryClient } from "@tanstack/react-query";

const LIST_KEY = ["workouts"];
const SINGLE_KEY = (id) => ["workout", id];

export const useWorkout = (id) => {
  if (!id) {
    throw new Error("useWorkout requires a id to be provided.");
  }

  const setSuccess = useSuccessSnackbar();
  const setError = useErrorSnackbar();
  const qc = useQueryClient?.();

  const workout = useGetQuery(SINGLE_KEY(id), `/workout/${id}`);

  const mutateWorkout = usePutMutation(
    ["workout", "update"],
    `/workout/${id}`,
    {
      onMutate: (qcLocal, { payload }) => {
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
      onSuccess: () => setSuccess("Workout updated"),
      onError: (_err, _vars, ctx) => {
        ctx?.rollback?.();
        setError("Failed to update exercise");
      },
    }
  );
  const mutateCompleteWorkout = usePutMutation(
    ["workout", "complete"],
    `/workout/${id}/complete`,
    {
      // we don’t assume any field shape, just refetch
      invalidations: [SINGLE_KEY(id), LIST_KEY],
      onSuccess: () => setSuccess("Workout marked as complete"),
      onError: () => setError("Failed to complete workout"),
    }
  );
  const mutateLogSet = usePutMutation(
    ["workout", "log", "update"],
    ({ logId }) => `/workout/log/${logId}`,
    {
      invalidations: [SINGLE_KEY(id)],
      onSuccess: () => setSuccess("Set logged"),
      onError: () => setError("Failed to log set"),
    }
  );

  const mutateDeleteWorkout = useDeleteMutation(
    ["workout", "delete"],
    `/workout/${id}`,
    {
      onMutate: (qcLocal) => {
        const client = qc ?? qcLocal;
        const prevList = client.getQueryData(LIST_KEY);
        const prevSingle = client.getQueryData(SINGLE_KEY(id));

        if (prevList) {
          client.setQueryData(
            LIST_KEY,
            prevList.filter((w) => w.id !== id)
          );
        }
        client.removeQueries(SINGLE_KEY(id));

        return {
          rollback: () => {
            if (prevList) client.setQueryData(LIST_KEY, prevList);
            if (prevSingle) client.setQueryData(SINGLE_KEY(id), prevSingle);
          },
        };
      },
      invalidations: [LIST_KEY],
      onSuccess: () => setSuccess("Workout deleted"),
      onError: (_err, _vars, ctx) => {
        ctx?.rollback?.();
        setError("Failed to delete workout");
      },
    }
  );

  const logSet = async (logId, payload) => mutateLogSet({ logId, payload });
  const completeWorkout = async () => mutateCompleteWorkout({});
  const updateWorkout = async (payload) => mutateWorkout({ payload });
  const deleteWorkout = async () => mutateDeleteWorkout({});

  return { workout, updateWorkout, deleteWorkout, logSet, completeWorkout };
};
