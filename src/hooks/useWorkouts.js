import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";
import { useQueryClient } from "@tanstack/react-query";

const LIST_KEY = ["workouts"];
const SINGLE_KEY = (id) => ["workout", id];

export const useWorkouts = () => {
    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();
    const qc = useQueryClient?.();

    const workouts = useGetQuery(LIST_KEY, "/workout");

    const createWorkout = usePostMutation(
        ["workout", "create"],
        "/workout/create",
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
                setSuccess("Workout added");
            },
            // Fallback: always ensure fresh data
            invalidations: [LIST_KEY],
            onError: (_err, _vars, ctx) => {
                ctx?.rollback?.();
                setError("Failed to add workout");
            },
        }
    );

    const deleteWorkoutMut = useDeleteMutation(
        ["workout", "delete"],
        // expects vars: { id }
        ({ id }) => `/workout/${id}`,
        {
            onMutate: (qcLocal, { id }) => {
                const client = qc ?? qcLocal;

                const prevList = client.getQueryData(LIST_KEY) || [];
                const prevSingle = client.getQueryData(SINGLE_KEY(id));

                // optimistic remove from list
                client.setQueryData(
                    LIST_KEY,
                    prevList.filter((w) => w.id !== id)
                );

                // remove cached single workout
                client.removeQueries({ queryKey: SINGLE_KEY(id), exact: true });

                return {
                    prevList,
                    prevSingle,
                    rollback: () => {
                        client.setQueryData(LIST_KEY, prevList);
                        if (prevSingle) {
                            client.setQueryData(SINGLE_KEY(id), prevSingle);
                        }
                    },
                };
            },
            onSuccess: () => {
                setSuccess("Workout deleted!");
            },
            onError: (_err, _vars, ctx) => {
                ctx?.rollback?.();
                setError("Failed to delete workout.");
            },
            invalidations: [LIST_KEY],
        }
    );

    const addWorkout = async (payload) => createWorkout({ payload });
    const deleteWorkout = async (id) => deleteWorkoutMut({ id });

    return { workouts, addWorkout, deleteWorkout };
};
