import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";
import { useQueryClient } from "@tanstack/react-query";

const LIST_KEY = ["programs"];
const SINGLE_KEY = (id) => ["program", id];

export const usePrograms = () => {
    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();
    const qc = useQueryClient?.();

    const programs = useGetQuery(LIST_KEY, "/program");

    const createProgram = usePostMutation(
        ["program", "create"],
        "/program/create",
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
                setSuccess("Program added");
            },
            // Fallback: always ensure fresh data
            invalidations: [LIST_KEY],
            onError: (_err, _vars, ctx) => {
                ctx?.rollback?.();
                setError("Failed to add program");
            },
        }
    );

        const deleteProgramMut = useDeleteMutation(
            ["program", "delete"],
            ({ id }) => `/program/${id}`,
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
                    setSuccess("Program deleted!");
                },
                onError: (_err, _vars, ctx) => {
                    ctx?.rollback?.();
                    setError("Failed to delete program.");
                },
                invalidations: [LIST_KEY],
            }
        );

    const addprogram = async (payload) => createProgram(payload);
    const deleteProgram = async (id) => deleteProgramMut({ id });

    return { programs, addprogram, deleteProgram };
};
