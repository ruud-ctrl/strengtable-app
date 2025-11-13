import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { Pressable, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@theme/useTheme";

/**
 * Props:
 * - onRefresh?: () => Promise<void> | void
 * - refreshing?: boolean (external control)
 * - title?: string
 * - headerShown?: boolean
 * - headerRight?: React.ReactNode | (() => React.ReactNode)
 * - headerRightAction?: () => void
 * - headerRightIcon?: string
 * - headerLeft?: React.ReactNode | (() => React.ReactNode)
 * - headerStyleOverride?: object
 * - headerTitleStyleOverride?: object
 * - scroll?: boolean (default: true)   👈 NEW
 */
const PageWrapper = ({
  children,
  onRefresh,
  refreshing: extRefreshing,
  title,
  headerShown = true,
  headerRight,
  headerRightAction,
  headerRightIcon,
  headerLeft,
  headerStyleOverride,
  headerTitleStyleOverride,
  scroll = true,            // 👈 NEW
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // --- pull-to-refresh (internal vs external control)
  const [intRefreshing, setIntRefreshing] = useState(false);
  const refreshing = extRefreshing ?? intRefreshing;

  const handleRefresh = useCallback(async () => {
    if (!onRefresh) return;
    if (extRefreshing == null) setIntRefreshing(true);
    try {
      await onRefresh();
    } finally {
      if (extRefreshing == null) setIntRefreshing(false);
    }
  }, [onRefresh, extRefreshing]);

  const headerRightFn = useMemo(() => {
    if (typeof headerRight === "function") return headerRight;
    if (headerRight != null) return () => headerRight;

    if (headerRightAction && headerRightIcon) {
      return () => (
        <Pressable
          onPress={headerRightAction}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          style={{ paddingHorizontal: 8, paddingVertical: 4 }}
        >
          <Ionicons
            name={headerRightIcon}
            size={22}
            color={colors.contrast[100]}
          />
        </Pressable>
      );
    }

    return undefined;
  }, [headerRight, headerRightAction, headerRightIcon, colors.contrast]);

  const headerLeftFn = useMemo(() => {
    if (typeof headerLeft === "function") return headerLeft;
    if (headerLeft != null) return () => headerLeft;
    return undefined;
  }, [headerLeft]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown,
      title,
      headerRight: headerRightFn,
      headerLeft: headerLeftFn,
      headerStyle: {
        backgroundColor: colors.base[500],
        ...(headerStyleOverride || {}),
      },
      headerTitleStyle: {
        color: colors.contrast[100],
        ...(headerTitleStyleOverride || {}),
      },
      headerTintColor: colors.contrast[100],
    });
  }, [
    navigation,
    title,
    headerShown,
    headerRightFn,
    headerLeftFn,
    colors.base,
    colors.contrast,
    headerStyleOverride,
    headerTitleStyleOverride,
  ]);

  return (
    <SafeAreaView
      edges={0}
      style={{ flex: 1, backgroundColor: colors.base[0] }}
    >
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={true}
          refreshControl={
            onRefresh
              ? (
                <RefreshControl
                  tintColor={colors.contrast[0]}
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
                )
              : undefined
          }
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ gap: 8, padding: 8 }}>
            {children}
          </View>
        </ScrollView>
      ) : (
        // 🔥 No ScrollView — safe for FlatList/SectionList
        <View style={{ flex: 1, gap: 8, padding: 8 }}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
};

export default PageWrapper;
