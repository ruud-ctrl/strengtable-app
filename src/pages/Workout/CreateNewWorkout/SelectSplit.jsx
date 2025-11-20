import { View } from "react-native";
import { useProgram } from "@hooks/useProgram";
import { useTheme } from "@theme/useTheme";
import {DropDownSelect, Text, Caption, DataWrapper } from "@components";
import { useState } from "react";

export default function SelectSplit({
  programId,
  selectedSplitId,
  setSelectedSplitId,
}) {
  const { colors } = useTheme();
  const { program } = useProgram(programId);

  const [open, setOpen] = useState(false);

  return (
    <DataWrapper query={program} errorMessage="Failed to load program details.">
      {(data) => {
        if (!data || !data.splits || data.splits.length === 0) {
          return (
            <View>
              <Text style={{ color: colors.text }}>
                This program has no splits yet.
              </Text>
            </View>
          );
        }

        const options = data.splits.map((p) => ({
          label: p.name,
          value: p.id,
        }));

        return (
          <View>
            <Caption>Select split</Caption>

            <DropDownSelect
              items={options}
              value={selectedSplitId}
              onChange={(value) => {
                setSelectedSplitId(value);
              }}
              placeholder="Select a Split"
              open={open}
              setOpen={setOpen}
              zIndex={open ? 4000 : 3000}
              containerStyle={{ zIndex: open ? 4000 : 3000 }}
              dropDownContainerStyle={{ zIndex: open ? 4000 : 3000 }}
            />
          </View>
        );
      }}
    </DataWrapper>
  );
}
