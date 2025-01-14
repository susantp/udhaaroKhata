import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import lang from "@/lang/lang";
import ContentWrapper from "@/components/common/ContentWrapper";
import { FlatList, Text, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import { Link } from "expo-router";
import useCreateTransactionHook from "@/hooks/useCreateTransactionHook";
import React from "react";
import TransactionRenderView from "@/components/common/TransactionRenderView";
import ConfirmationDialog from "@/components/common/ConfirmDialog";
import AddTransactionBtn from "@/components/common/AddTransactionBtn";

export default function HomeScreen() {
  const {
    dialogVisible,
    setDialogVisible,
    transactionList,
    setSelectedTransaction,
    deleteTransaction,
  } = useCreateTransactionHook();
  const totalSum = transactionList.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);

  return (
    <SafeAreaWrapper>
      <ScreenHeader title={lang("All transactions")} />
      <ContentWrapper>
        <AddTransactionBtn totalSum={totalSum} />
        <FlatList
          data={transactionList}
          contentContainerStyle={{ padding: 10, rowGap: 10 }}
          renderItem={({ item }) => (
            <TransactionRenderView
              key={item.transactionId}
              item={item}
              onDelete={() => {
                setSelectedTransaction(item);
                setDialogVisible(!dialogVisible);
              }}
            />
          )}
        />
        <ConfirmationDialog
          visible={dialogVisible}
          message="Are you sure you want to delete this transaction?"
          onConfirm={deleteTransaction}
          onCancel={() => setDialogVisible(!dialogVisible)}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
