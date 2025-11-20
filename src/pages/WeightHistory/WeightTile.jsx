import {Panel, Text} from '@components'

const WeightTile = ({ item }) => {
    return (
        <Panel>
            <Text>
                {item.weight} kg
            </Text>
            <Text>
                {item.created_at}
            </Text>
        </Panel>
    )
}

export default WeightTile