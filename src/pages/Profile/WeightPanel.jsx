import BottomSheet from '@components/BottomSheet'
import Button from '@components/Button'
import Panel from '@components/Panel'
import { H2, H3, Small } from '@components/Text'
import { useRef } from 'react'
import { Text, View } from 'react-native'
import { formatDate } from '@utils/formatDate'

const WeightPanel = ({ userProfile }) => {
    
      const weightSheetRef = useRef(null);
    
    return (
        <Panel style={{ marginTop: 16 }}>
            <View style={{ flexDirection: "row", margin: 8 }}>
                <View>

                    <H2>Latest weight</H2>
                    <View style={{ height: 8 }} />
                    <H3>
                        {userProfile?.latest_weight?.weight
                            ? `${Number(userProfile?.latest_weight.weight).toFixed(2)} ${userProfile?.preferred_units === "imperial" ? "lb" : "kg"}`
                            : "—"}
                    </H3>
                    <Small >
                        {userProfile?.latest_weight?.created_at ? `Recorded ${formatDate(userProfile?.latest_weight.created_at)}` : ""}
                    </Small>
                </View>
                <View flexDirection={"row"} marginLeft={"auto"}>

                    <Button title="Add Weight" onPress={() => weightSheetRef.current?.open()} />
                </View>
            </View>
                  <BottomSheet
        ref={weightSheetRef}
        modalHeight={380}
        modalStyle={{
          backgroundColor: "#101214",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
        contentContainerStyle={{ gap: 12 }}
        HeaderComponent={
          <View style={{ padding: 16 }}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
              Add Current Weight
            </Text>
          </View>
        }
      >
<Text>Weight things</Text>
      </BottomSheet>
        </Panel>
    )
}

export default WeightPanel