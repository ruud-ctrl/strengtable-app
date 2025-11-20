// @components/DataWrapper.tsx
import { View, ActivityIndicator } from "react-native";
import { ErrorStatePanel } from "@components";
import { useTheme } from "@theme/useTheme";

export default function DataWrapper({ query, children, errorMessage = "Something went wrong." }) {
  const { colors } = useTheme();
  const { data, isLoading, isError, refetch } = query;

  const hasData = data !== undefined && data !== null;

  if (isLoading && !hasData) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <ActivityIndicator color={"#fff"} />
      </View>
    );
  }

  if (isError && !hasData) {
    return (
      <ErrorStatePanel
        message={errorMessage}
        onRetry={() => refetch?.()}
      />
    );
  }
  return children(data);
}
