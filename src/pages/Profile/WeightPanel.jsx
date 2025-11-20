import { useRef } from 'react'
import { H2, H3, Small, Panel, Button, WeightInputSheet } from '@components'
import { View } from 'react-native'
import { formatDate } from '@utils/formatDate'

const WeightPanel = ({ userProfile }) => {

  const weightSheetRef = useRef(null);

  return (
    <Panel>
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
<WeightInputSheet ref={weightSheetRef} />
    </Panel>
  )
}

export default WeightPanel