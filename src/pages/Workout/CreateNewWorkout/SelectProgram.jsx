import { useState } from "react";
import {DropDownSelect, Caption} from "@components";
import { View } from "react-native";

const SelectProgram = ({ data, setSelectedProgramId, selectedProgramId }) => {
    const [open, setOpen] = useState(false);

    const transformed = (data) =>
        data.map((p) => ({
            label: p.name,
            value: p.id,
        }));

    return (
        <View>
        <Caption>Select program</Caption>
        <DropDownSelect
            items={transformed(data)}
            value={selectedProgramId}
            onChange={(value) => {
                setSelectedProgramId(value);
            }}
            placeholder="Select a Program"
            open={open}
            setOpen={setOpen}
            zIndex={open ? 4000 : 3000}
            containerStyle={{ zIndex: open ? 4000 : 3000 }}
            dropDownContainerStyle={{ zIndex: open ? 4000 : 3000 }}
            />
            </View>
    )
}

export default SelectProgram