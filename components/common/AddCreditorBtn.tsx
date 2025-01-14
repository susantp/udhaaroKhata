import { Link } from "expo-router";
import { Text, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import lang from "@/lang/lang";
import React from "react";

const AddCreditorBtn = () => (
  <Link href={{ pathname: "/creditors/create" }}>
    <View className="w-full flex-row justify-end px-4 py-2.5">
      <View className="flex-row items-center justify-between gap-x-2 rounded-md bg-orange-600 px-2 py-3">
        <PlusIcon size={20} color="white" />
        <Text className="text-md font-semibold text-white">
          {lang("Add Creditor")}
        </Text>
      </View>
    </View>
  </Link>
);

export default AddCreditorBtn;
