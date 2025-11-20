import { View } from "react-native";
import {PageWrapper, Panel, Text, H2, TextButton, DataWrapper } from "@components";
import { useTheme } from "@theme/useTheme";
import { useProgram } from "@hooks/useProgram";
import { usePersonal } from "hooks/usePersonal";
import SplitPanel from "./SplitPanel";

export default function SingleProgram({ route }) {
  const id = route.params?.id ?? "—";
  const { program } = useProgram(id);
  const { userProfile: { data: userProfile }, setActiveProgram } = usePersonal();
  const { colors } = useTheme();

  const setActive = async (programId) => {
    try {
      await setActiveProgram({ programId });
    } catch (e) {
      console.warn("Failed to set active program", e);
    }
  };

  const isActive = id === userProfile?.active_program;

  return (
    <PageWrapper
      title={program?.data?.name ?? "Program"}
      onRefresh={program.refetch}
      refreshing={program.isFetching}
    >
      <DataWrapper query={program} errorMessage="Failed to load workout.">
        {(data) => (
          <Panel>
            <H2>{data.name}</H2>
            {data?.description ? (
              <Text style={{ color: colors.contrast[300], marginTop: 4 }}>
                {data?.description}
              </Text>
            ) : null}

            <View style={{ flexDirection: "row", gap: 12, marginTop: 8, alignItems: "center" }}>
              <Text style={{ color: colors.contrast[300] }}>
                ID: <Text style={{ color: colors.contrast[100] }}>{id}</Text>
              </Text>

              <Text style={{ color: colors.contrast[300] }}>
                Status:{" "}
                <Text style={{ color: isActive ? "#22c55e" : "#ef4444" }}>
                  {isActive ? "Active" : "Inactive"}
                </Text>
              </Text>

              {!isActive && (
                <TextButton
                  title="Set Active"
                  rightIcon="star-outline"
                  underline
                  onPress={() => setActive(id)}
                />
              )}
            </View>


            {data?.splits?.map((split, i) => (
              <SplitPanel key={i} split={split} />
            ))}
          </Panel>
        )}
      </DataWrapper>
    </PageWrapper>
  );
}
