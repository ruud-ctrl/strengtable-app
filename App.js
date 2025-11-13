import Router from '@router';
import { RootProvider } from "@state/RootProvider";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from "react-native-portalize";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';

export default function App() {
    return (
        <RecoilRoot>
            <SafeAreaProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Host>
                        <RootProvider>
                            <Router />
                        </RootProvider>
                    </Host>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </RecoilRoot>
    );
}