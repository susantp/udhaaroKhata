import React from "react";
import {
  Button,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import dayjs from "dayjs";
import { ChevronRightIcon, TrashIcon } from "react-native-heroicons/outline";
import { Dialog } from "react-native-simple-dialogs";
import { TransactionRenderViewItem } from "@/types";
import { GestureEvent } from "react-native-gesture-handler";

interface TransactionRenderViewProps {
  item: TransactionRenderViewItem;
  onDelete: () => void;
}

const TransactionRenderView = ({
  item,
  onDelete,
}: TransactionRenderViewProps) => (
  <View className="flex-row items-center border-b border-b-gray-300 py-2">
    <View className="w-9/12 flex-row">
      <View className="3/9 flex-1 flex-row">
        <Text className="text-md font-semibold text-black">
          {dayjs(item.transactionDate).format("YYYY-MM-DD")}
        </Text>
      </View>
      <View className="3/9 flex-1 flex-row">
        <Text className="text-md overflow-hidden font-semibold text-black">
          {item.creditor}
        </Text>
      </View>
      <View className="3/9 flex-1 flex-row">
        <Text className="text-md font-semibold text-black">{item.amount}</Text>
      </View>
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
export default TransactionRenderView;
