import { Button, Text, View } from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import React from "react";

interface ConfirmationDialogProps {
  visible: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  message: string;
}
export default function ConfirmationDialog({
  visible,
  onConfirm,
  onCancel,
  message,
}: ConfirmationDialogProps) {
  return (
    <Dialog
      dialogStyle={{
        backgroundColor: "red",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
      visible={visible}
      contentInsetAdjustmentBehavior="automatic"
      onRequestClose={onCancel}
      onTouchOutside={onCancel}
    >
      <View className="flex-col items-center justify-items-center gap-y-8">
        <Text className="text-xl font-extrabold text-white">{message}</Text>
        <View className="flex-row gap-x-4">
          <Button title="Sure" color={`#ae5555`} onPress={onConfirm} />
          <Button title="Cancel" color="green" onPress={onCancel} />
        </View>
      </View>
    </Dialog>
  );
}
