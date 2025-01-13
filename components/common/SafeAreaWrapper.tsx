import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaWrapperProps {
  children: React.ReactNode[] | React.ReactNode;
}

export const SafeAreaWrapper = ({ children }: SafeAreaWrapperProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className={`flex-col bg-orange-600`} style={{ flex: 1 }}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
