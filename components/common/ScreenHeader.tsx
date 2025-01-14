import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import React from "react";

const ScreenHeader = ({ title }: { title: string | undefined }) => {
  const canGoBack = router.canGoBack();
  return (
    <View className="flex-row items-center justify-between px-1">
      <TouchableOpacity
        activeOpacity={0.4}
        className="flex-row items-center gap-x-2 py-4"
        onPress={() => (canGoBack ? router.back() : router.dismissTo("/"))}
      >
        {canGoBack ? (
          <ChevronLeftIcon size={20} strokeWidth={4} color="white" />
        ) : undefined}
        <Text className="text-xl font-semibold text-white">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ScreenHeader;
