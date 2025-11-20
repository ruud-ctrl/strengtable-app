import { RefreshControl } from "react-native"

const Refresher = ({isFetching, refetch}) => {
    return (
        <RefreshControl
            refreshing={isFetching}
            tintColor="#fff"
            progressViewOffset={10}
            onRefresh={refetch}
        />
    )
}

export default Refresher