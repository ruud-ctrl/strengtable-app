import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

const initialData = {
  personal: { name: "", age: "" },
  workout: { goal: "", daysPerWeek: 3 },
};

const FormDataContext = createContext(null);

export function FormDataProvider({ children }) {
  const [data, setData] = useState(initialData);

  const mergeAt = useCallback((key, partial) => {
    setData(prev => ({ ...prev, [key]: { ...prev[key], ...partial } }));
  }, []);

  const reset = useCallback(() => setData(initialData), []);

  const value = useMemo(() => ({ data, setData, mergeAt, reset }), [data, mergeAt, reset]);
  return <FormDataContext.Provider value={value}>{children}</FormDataContext.Provider>;
}

export function useFormData() {
  const ctx = useContext(FormDataContext);
  if (!ctx) throw new Error("useFormData must be used within FormDataProvider");
  return ctx;
}