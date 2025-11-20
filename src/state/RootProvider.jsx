import { FormDataProvider } from "./FormDataProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function RootProvider({ children }) {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
                <FormDataProvider>{children}</FormDataProvider>
        </QueryClientProvider>
    );
}