import { Tabs } from "expo-router";
import { BarChart3, CreditCard, Settings, Sliders } from "lucide-react-native";
import React from "react";
import { nudeColors } from '@/constants/colors';

export default function TabLayout() {
return (
  <Tabs
    screenOptions={{
      tabBarActiveTintColor: nudeColors.coffee,
      tabBarInactiveTintColor: nudeColors.textSecondary,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: nudeColors.softWhite,
        borderTopWidth: 1,
        borderTopColor:
          nudeColors.beige,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 6,
      },
    }}
    >
    <Tabs.Screen
      name="dashboard"
      options={{
        title: "Dashboard",
        tabBarIcon: ({ color }) => <BarChart3 size={24} color={color} />,
      }}
    />
    <Tabs.Screen
      name="expenses"
      options={{
        title: "Expenses",
        tabBarIcon: ({ color }) => <CreditCard size={24} color={color} />,
      }}
    />
    <Tabs.Screen
      name="categories"
      options={{
        title: "Categories",
        tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
      }}
    />
      <Tabs.Screen
      name="settings"
      options={{
        title: "Settings",
        tabBarIcon: ({ color }) => <Sliders size={24} color={color} />,
      }}
    />
  </Tabs>
);
}
