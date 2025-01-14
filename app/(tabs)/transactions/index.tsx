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
import { desc, eq } from "drizzle-orm";
import { Dialog } from "react-native-simple-dialogs";
import useCreateTransactionHook from "@/hooks/useCreateTransactionHook";

export default function HomeScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const { data } = useLiveQuery(
    drizzleDb
      .select()
      .from(transactions)
      .orderBy(desc(transactions.created_at))
      .leftJoin(creditors, eq(transactions.creditor_id, creditors.id)),
  );
  const { dialogVisible, setDialogVisible, deleteTransaction } =
    useCreateTransactionHook();
  const totalSum = data.reduce((acc, cur) => {
    return acc + cur.transactions.amount;
  }, 0);

  return (
    <SafeAreaWrapper>
      <ScreenHeader title={lang("All transactions")} />
      <ContentWrapper>
        <AddTransactionBtn totalSum={totalSum} />
        <FlatList
          data={data}
          contentContainerStyle={{ padding: 10, rowGap: 10 }}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-start border-b border-b-gray-300 py-2">
              <View className="w-9/12 flex-row justify-items-start gap-x-8">
                <Text className="text-md font-semibold text-black">
                  {item.transactions.transaction_date}
                </Text>
                <Text className="text-md font-semibold text-black">
                  {item.creditors ? item.creditors.name : "N/A"}
                </Text>
                <Text className="text-md font-semibold text-black">
                  {item.transactions.item}
                </Text>
                <Text className="text-md font-semibold text-black">
                  {item.transactions.amount}
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
                      onPress={() => deleteTransaction(item.transactions.id)}
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
          )}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
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
