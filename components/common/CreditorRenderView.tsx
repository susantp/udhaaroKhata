import { CreditorRenderViewItem } from "@/types";
import { Text, TouchableOpacity, View } from "react-native";
import { ChevronRightIcon, TrashIcon } from "react-native-heroicons/outline";
import React from "react";

interface CreditorRenderViewProps {
  item: CreditorRenderViewItem;
  onDelete: () => void;
}

const CreditorRenderView = ({ onDelete, item }: CreditorRenderViewProps) => (
  <View className="flex-row items-center justify-between border-b border-b-gray-300 py-3">
    <View className="w-9/12 flex-row gap-x-14">
      <Text className="text-md font-semibold text-black">
        {item.creditorName}
      </Text>
      <Text className="text-md font-semibold text-black">
        Total Credit: {item.totalAmount}
      </Text>
    </View>
    <View className="w-3/12 flex-row justify-end gap-x-2">
      <TouchableOpacity onPress={onDelete}>
        <TrashIcon size={28} color={"red"} />
      </TouchableOpacity>
      <TouchableOpacity>
        <ChevronRightIcon size={28} color={"black"} />
      </TouchableOpacity>
    </View>
  </View>
);

export default CreditorRenderView;
