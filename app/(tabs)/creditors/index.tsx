import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import lang from "@/lang/lang";
import ContentWrapper from "@/components/common/ContentWrapper";
import { FlatList } from "react-native";
import React from "react";
import ConfirmationDialog from "@/components/common/ConfirmDialog";
import useCreateCreditorHook from "@/hooks/useCreateCreditorHook";
import CreditorRenderView from "@/components/common/CreditorRenderView";
import AddCreditorBtn from "@/components/common/AddCreditorBtn";

export default function CreditorList() {
  const {
    data,
    setSelectedCreditor,
    dialogVisible,
    setDialogVisible,
    deleteCreditor,
  } = useCreateCreditorHook();

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
              <CreditorRenderView
                item={item}
                onDelete={() => {
                  setSelectedCreditor(item);
                  setDialogVisible(!dialogVisible);
                }}
              />
            );
          }}
        />
        <ConfirmationDialog
          visible={dialogVisible}
          message="Are you sure you want to delete the record ?"
          onConfirm={deleteCreditor}
          onCancel={() => setDialogVisible(!dialogVisible)}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
