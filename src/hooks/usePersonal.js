// usePersonal.ts
import { useGetQuery, usePutMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "./useSnackbar";

export const usePersonal = () => {
  const setSuccess = useSuccessSnackbar();
  const setError = useErrorSnackbar();

  const userProfile = useGetQuery(["profile"], "/user/profile");

  const mutateSetActive = usePutMutation(
    ["profile", "setActive"],
    "/user/set-active",
    {
      onMutate: (qc, { programId }) => {
        const key = ["profile"];
        const prev = qc.getQueryData(key);
        qc.setQueryData(key, (old) => ({ ...(old || {}), active_program: programId }));
        return { rollback: () => qc.setQueryData(key, prev) };
      },
      invalidations: [["profile"]],
      onSuccess: () => setSuccess("Active program set"),
      onError: () => setError("Failed to set active program."),
    }
  );

  const mutateSetTheme = usePutMutation(
    ["profile", "setTheme"],
    "/user/set-theme",
    {
      onMutate: (qc, { value }) => {
        const key = ["profile"];
        const prev = qc.getQueryData(key);
        qc.setQueryData(key, (old) => ({ ...(old || {}), theme: value }));
        return { rollback: () => qc.setQueryData(key, prev) };
      },
      invalidations: [["profile"]],
      onSuccess: () => setSuccess("Theme set"),
      onError: () => setError("Failed to set theme."),
    }
  );

  const mutateSetUnits = usePutMutation(
    ["profile", "setTheme"],
    "/user/set-units",
    {
      onMutate: (qc, { value }) => {
        const key = ["profile"];
        const prev = qc.getQueryData(key);
        qc.setQueryData(key, (old) => ({ ...(old || {}), preferred_units: value }));
        return { rollback: () => qc.setQueryData(key, prev) };
      },
      invalidations: [["profile"]],
      onSuccess: () => setSuccess("Units changed"),
      onError: () => setError("Failed to set units"),
    }
  );

  const mutateSetSubscriptionNewsletter = usePutMutation(
    ["profile", "setTheme"],
    "/user/set-subscription-newsletter",
    {
      onMutate: (qc, { value }) => {
        const key = ["profile"];
        const prev = qc.getQueryData(key);
        qc.setQueryData(key, (old) => ({ ...(old || {}), preferred_units: value }));
        return { rollback: () => qc.setQueryData(key, prev) };
      },
      invalidations: [["profile"]],
      onSuccess: () => setSuccess("Units changed"),
      onError: () => setError("Failed to set units"),
    }
  );

  const mutateAddWeight = usePutMutation(
    ["profile", "addWeight"],
    "/user/add-weight",
    {
      onMutate: (qc, { value }) => {
        const key = ["profile"];
        const prev = qc.getQueryData(key);
        qc.setQueryData(key, (old) => ({ ...(old || {}), latest_weight: { weight: value, created_at: 0 } }));
        return { rollback: () => qc.setQueryData(key, prev) };
      },
      invalidations: [["profile"]],
      onSuccess: () => setSuccess("Theme set"),
      onError: () => setError("Failed to set theme."),
    }
  );

  const setActiveProgram = async (data) => {
    return await mutateSetActive(data);
  };

  const setTheme = async (data) => {
    return await mutateSetTheme(data);
  };

  const setUnitType = async (data) => {
    return await mutateSetUnits(data);
  };

  const setSubscriptionNewsletter = async (data) => {
    return await mutateSetSubscriptionNewsletter(data);
  };

  const setNewWeight = async (data) => {
    return await mutateAddWeight(data);
  };

  return {
    userProfile,
    setActiveProgram,
    setTheme,
    setUnitType,
    setSubscriptionNewsletter,
    setNewWeight,
  };
};
