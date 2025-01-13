import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
  styles?: StyleProp<ViewStyle>;
}

const ContentWrapper = ({
  children,
  className,
  styles,
}: ContentWrapperProps) => {
  const mergedClasses = [
    ...new Set([
      ...(className?.split(" ") || []),
      "flex-1",
      "bg-white",
      "flex-col",
    ]),
  ].join(" ");
  return (
    <View style={styles} className={mergedClasses}>
      {children}
    </View>
  );
};
export default ContentWrapper;
