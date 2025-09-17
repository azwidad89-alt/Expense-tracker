import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ExpenseProvider } from "@/hooks/expense-store";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

function RootLayoutNav() {
return (
  <Stack screenOptions={{ headerBackTitle: "Back" }}>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="modal" options={{ presentation: "modal" }} />
  </Stack>
);
}
export default function RootLayout() {
useEffect(() => {
  SplashScreen.hideAsync();
}, []);

return (
  <QueryClientProvider client={queryClient}>
    <ExpenseProvider>
      <GestureHandlerRootView style={styles.container}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </ExpenseProvider>
  </QueryClientProvider>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
},
});
