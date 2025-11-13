import { usePostMutation, usePutMutation, useDeleteMutation, useGetQuery } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";
import { createMutationHandler } from "../utils/mutationHandler";

const pick = (obj, keys) =>
  keys.reduce((acc, k) => (k in (obj || {}) ? ((acc[k] = obj[k]), acc) : acc), {});

export const useProgram = (programId) => {
  if (!programId) {
    throw new Error("useProgram requires a programId to be provided.");
  }

  const setSuccess = useSuccessSnackbar();
  const setError = useErrorSnackbar();
  const handleMutation = createMutationHandler({ setSuccess, setError });

  const program = useGetQuery(["program", programId], `/program/${programId}`);

  const editProgramMut = usePutMutation(
    ["program", programId, "edit"],
    () => `/program/${programId}`,
    {
      onMutate: (qc, body) => {
        const key = ["program", programId];
        const prev = qc.getQueryData(key);
        // optimistic: update only known editable fields
        qc.setQueryData(key, (old) => ({ ...(old || {}), ...pick(body, ["name", "description"]) }));
        return { rollback: () => qc.setQueryData(key, prev) };
      },
      invalidations: [
        ["program", programId],
        ["programs"],
      ],
      onSuccess: () => setSuccess("Program updated!"),
      onError: () => setError("Failed to update program."),
    }
  );

  // Delete program (remove detail cache, invalidate list)
  const deleteProgramMut = useDeleteMutation(
    ["program", programId, "delete"],
    () => `/program/${programId}`,
    {
      invalidations: (qc) => {
        qc.removeQueries({ queryKey: ["program", programId] });
        qc.invalidateQueries({ queryKey: ["programs"] });
      },
      onSuccess: () => setSuccess("Workout deleted!"),
      onError: () => setError("Failed to delete workout."),
    }
  );

  // Activate program (optimistic flip of profile.active_program, then invalidate)
  const activateProgramMut = usePostMutation(
    ["program", programId, "activate"],
    () => `/program/${programId}/activate`,
    {
      onMutate: (qc) => {
        const profileKey = ["profile"];
        const prevProfile = qc.getQueryData(profileKey);
        qc.setQueryData(profileKey, (old) => ({ ...(old || {}), active_program: programId }));
        // if your program detail has a local "isActive"/"status" you want to show, update it too:
        const progKey = ["program", programId];
        const prevProg = qc.getQueryData(progKey);
        qc.setQueryData(progKey, (old) => ({ ...(old || {}), isActive: true }));
        return {
          rollback: () => {
            qc.setQueryData(profileKey, prevProfile);
            qc.setQueryData(progKey, prevProg);
          },
        };
      },
      invalidations: [
        ["profile"],            // so ProgramDetails status flips from canonical data
        ["program", programId], // refresh this program’s detail
        ["programs"],           // refresh listing if you show “Active” badges there
      ],
      onSuccess: () => setSuccess("Activate program!"),
      onError: () => setError("Failed to activate program."),
    }
  );

  // Add split (optimistic insert into program.splits)
  const addSplitMut = usePostMutation(
    ["splits", programId, "add"],
    () => `/program/${programId}/add-split`,
    {
      onMutate: (qc, body) => {
        const key = ["program", programId];
        const prev = qc.getQueryData(key);
        const tempId = `temp-${Date.now()}`;
        qc.setQueryData(key, (old) => {
          const next = { ...(old || {}), splits: [...(old?.splits || [])] };
          next.splits.push({
            id: tempId,
            name: body?.name ?? "New Split",
            description: body?.description ?? "",
            order: (next.splits.length || 0) + 1,
            exercises: [],
            _optimistic: true,
          });
          return next;
        });
        return {
          rollback: () => qc.setQueryData(key, prev),
        };
      },
      invalidations: [
        ["program", programId],
        ["programs"],
      ],
      onSuccess: () => setSuccess("Split added!"),
      onError: () => setError("Failed to add split."),
    }
  );

  return {
    program,
    editProgram: (data) =>
      handleMutation(
        editProgramMut,
        data,
        "Program updated!",
        "Failed to update program.",
        ["name", "description"]
      ),

    deleteProgram: () =>
      handleMutation(deleteProgramMut, {}, "Workout deleted!", "Failed to delete workout."),

    activateProgram: () =>
      handleMutation(activateProgramMut, {}, "Activate program!", "Failed to activate program."),

    addSplit: (data) =>
      handleMutation(
        addSplitMut,
        data,
        "Split added!",
        "Failed to add split.",
        ["name", "description"]
      ),
  };
};
