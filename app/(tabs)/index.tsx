import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import lang from "@/lang/lang";
import ContentWrapper from "@/components/common/ContentWrapper";
import { FlatList } from "react-native";
import useCreateTransactionHook from "@/hooks/useCreateTransactionHook";
import TransactionRenderView from "@/components/common/TransactionRenderView";
import React from "react";
import ConfirmationDialog from "@/components/common/ConfirmDialog";

export default function HomeScreen() {
  const {
    setSelectedTransaction,
    setDialogVisible,
    dialogVisible,
    deleteTransaction,
    transactionList,
  } = useCreateTransactionHook();
  return (
    <SafeAreaWrapper>
      <ScreenHeader title={lang("Today's transactions")} />
      <ContentWrapper>
        <FlatList
          keyExtractor={(item) => item.transactionId.toString()}
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
