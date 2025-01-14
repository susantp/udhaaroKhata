import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import TabBarBackground from "@/components/ui/TabBarBackground";
import {
  HomeIcon,
  UserGroupIcon,
  WalletIcon,
} from "react-native-heroicons/outline";
import lang from "@/lang/lang";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "orange",
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: lang("Home"),
          tabBarIcon: ({ color }) => <HomeIcon size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: lang("Transactions"),
          tabBarIcon: ({ color }) => <WalletIcon size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="creditors"
        options={{
          title: lang("Creditors"),
          tabBarIcon: ({ color }) => <UserGroupIcon size={30} color={color} />,
        }}
      />
    </Tabs>
  );
}
