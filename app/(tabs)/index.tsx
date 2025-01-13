import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import lang from "@/lang/lang";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { transactions } from "@/db/schema";
import { useEffect, useState } from "react";
import ContentWrapper from "@/components/common/ContentWrapper";
import { FlatList, Text, View } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { Transaction } from "@/types";

export default function HomeScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);

  useEffect(() => {
    const load = async () => {
      const res: Transaction[] = drizzleDb.select().from(transactions).all();
      setTransactionList(res);
    };
    load();
  }, []);

  return (
    <SafeAreaWrapper>
      <ScreenHeader title={lang("Today's transactions")} />
      <ContentWrapper>
        <FlatList
          data={transactionList}
          renderItem={({ item }) => (
            <View className="flex-row justify-between">
              <Text className="text-black">{item.created_at}</Text>
              <ChevronRightIcon size={28} color={"white"} />
            </View>
          )}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
