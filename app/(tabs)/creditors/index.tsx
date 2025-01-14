import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import lang from "@/lang/lang";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { creditors, transactions } from "@/db/schema";
import ContentWrapper from "@/components/common/ContentWrapper";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
} from "react-native-heroicons/outline";
import { Link } from "expo-router";
import { Dialog } from "react-native-simple-dialogs";
import { useState } from "react";
import { eq, sql } from "drizzle-orm";

export default function CreditorList() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const { data } = useLiveQuery(
    drizzleDb
      .select({
        creditorId: creditors.id,
        creditorName: creditors.name,
        totalAmount: sql<number>`SUM(COALESCE(${transactions.amount}, 0))`,
      })
      .from(creditors)
      .leftJoin(transactions, eq(creditors.id, transactions.creditor_id))
      .groupBy(creditors.id, creditors.name),
  );
  const [dialogVisible, setDialogVisible] = useState(false);
  const deleteCreditor = async (id: number) => {
    drizzleDb
      .delete(creditors)
      .where(eq(creditors.id, id))
      .then((result) => {
        console.log(result);
        setDialogVisible(false);
      });
  };
  return (
    <SafeAreaWrapper>
      <ScreenHeader title={lang("Creditors")} />
      <ContentWrapper>
        <AddCreditorBtn />
        <FlatList
          data={data}
          contentContainerStyle={{ padding: 10, rowGap: 10 }}
          renderItem={({ item }) => {
            return (
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
                  <TouchableOpacity
                    onPress={() => setDialogVisible(!dialogVisible)}
                  >
                    <TrashIcon size={28} color={"red"} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <ChevronRightIcon size={28} color={"black"} />
                  </TouchableOpacity>
                </View>
                <Dialog
                  dialogStyle={{
                    backgroundColor: "red",
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  visible={dialogVisible}
                  contentInsetAdjustmentBehavior="automatic"
                  onRequestClose={() => setDialogVisible(!dialogVisible)}
                  onTouchOutside={() => setDialogVisible(!dialogVisible)}
                >
                  <View className="flex-col items-center justify-items-center gap-y-8">
                    <Text className="text-xl font-extrabold text-white">
                      Are you sure want to delete this record ?
                    </Text>
                    <View className="flex-row gap-x-4">
                      <Button
                        title="Sure"
                        color={`#ae5555`}
                        onPress={() => deleteCreditor(item.creditorId)}
                      />
                      <Button
                        title="Cancel"
                        color="green"
                        onPress={() => setDialogVisible(!dialogVisible)}
                      />
                    </View>
                  </View>
                </Dialog>
              </View>
            );
          }}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}

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
