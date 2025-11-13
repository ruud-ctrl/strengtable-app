import { useCallback } from "react";
import { atom, useSetRecoilState } from "recoil";

export const errorState = atom({
  key: "errorState",
  default: {
    open: false,
    message: "",
  },
});

export function useErrorSnackbar() {
  const setErrorSnackbar = useSetRecoilState(errorState);
  return useCallback(message => setErrorSnackbar({ open: true, message }), [setErrorSnackbar]);
}

export const infoState = atom({
    key: "infoState",
    default: {
      open: false,
      message: "",
    },
  });
  
  export function useInfoSnackbar() {
    const setInfoSnackbar = useSetRecoilState(infoState);
    return useCallback(message => setInfoSnackbar({ open: true, message }), [setInfoSnackbar]);
  }

  export const successState = atom({
    key: "successState",
    default: {
      open: false,
      message: "",
    },
  });
  
  export function useSuccessSnackbar() {
    const setSuccessSnackbar = useSetRecoilState(successState);
    return useCallback(message => setSuccessSnackbar({ open: true, message }), [setSuccessSnackbar]);
  }