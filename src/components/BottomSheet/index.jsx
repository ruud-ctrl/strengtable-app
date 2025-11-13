import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const BottomSheet = forwardRef(
  (
    {
      modalHeight = 360,
      snapPoint,
      alwaysOpen,
      HeaderComponent,
      FooterComponent,
      contentContainerStyle,
      modalStyle,
      withReactModal = false,
      withHandle = true,
      handlePosition = "inside",
      onClosed,
      onOpened,
      closeOnBackdrop = true,
      flatListProps,
      disableBottomSafeArea = false,
      modalizeProps = {},
      children,
    },
    ref
  ) => {
    const sheetRef = useRef(null);
    const { bottom } = useSafeAreaInsets();

    const paddingBottom = useMemo(
      () => (disableBottomSafeArea ? 0 : bottom),
      [bottom, disableBottomSafeArea]
    );

    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.open(),
      close: () => sheetRef.current?.close(),
      isOpen: () => Boolean(sheetRef.current?._modal), // heuristic
    }));

    return (
      
        <Portal>
          <Modalize
            ref={sheetRef}
            modalHeight={modalHeight}
            snapPoint={snapPoint}
            alwaysOpen={alwaysOpen}
            HeaderComponent={HeaderComponent ? <>{HeaderComponent}</> : undefined}
            FooterComponent={
              FooterComponent ? (
                <View style={{ paddingBottom }}>{FooterComponent}</View>
              ) : undefined
            }
            withReactModal={withReactModal}
            withHandle={withHandle}
            handlePosition={handlePosition}
            onClosed={onClosed}
            onOpened={onOpened}
            onOverlayPress={closeOnBackdrop ? () => sheetRef.current?.close() : undefined}
            modalStyle={modalStyle}
            flatListProps={flatListProps}
            {...modalizeProps}
          >
            {!flatListProps && (
              <View style={[{ padding: 16, paddingBottom }, contentContainerStyle]}>
                <SafeAreaView style={{ flex: 1, zIndex: 1 }} edges={['bottom']}>

                {children}
                </SafeAreaView>
              </View>
            )}
          </Modalize>
        </Portal>
    );
  }
);

export default BottomSheet;
