import { Stack } from "expo-router";
import React from "react";

import ElementProvider from "@/components/ElementProvider";
import ListProvider from "@/components/ListProvider";
import ChangeProvider from "@/components/ChangeProvider";
import IDProvider from "@/components/IDProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>

      <ListProvider>
        {/* <IDProvider> */}
        <ElementProvider>
          <ChangeProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="elements/[id]" options={{ headerTitle: "Details", headerTitleAlign: "center" }} />
              <Stack.Screen name="elements/edit/[id]" options={{ headerTitle: "Edit", headerTitleAlign: "center" }} />
            </Stack>
          </ChangeProvider>
        </ElementProvider>
        {/* </IDProvider> */}
      </ListProvider >
    </GestureHandlerRootView>
  )
}
