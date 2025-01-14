import { Link } from "expo-router";
import { Text, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import lang from "@/lang/lang";
import React from "react";

const AddTransactionBtn = ({ totalSum }: { totalSum: number }) => (
  <Link href={{ pathname: "/transactions/create" }}>
    <View className="w-full flex-row justify-between px-4 py-2.5">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-semibold text-red-600">
          Total Credit: {totalSum}
        </Text>
      </View>
      <View className="flex-row items-center justify-between gap-x-2 rounded-md bg-orange-600 px-2 py-3">
        <PlusIcon size={20} color="white" />
        <Text className="text-md font-semibold text-white">
          {lang("Add Transaction")}
        </Text>
      </View>
    </View>
  </Link>
);
export default AddTransactionBtn;
