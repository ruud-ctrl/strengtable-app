import { SafeAreaProvider } from "react-native-safe-area-context";
import { FormDataProvider } from "./FormDataProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function RootProvider({ children }) {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <FormDataProvider>{children}</FormDataProvider>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
}