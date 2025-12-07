import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Masque le header
        animation: "slide_from_right",
        gestureDirection: "horizontal",
      }}
    />
  );
}
