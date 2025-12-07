import { useRouter } from "expo-router";
import SplashScreen from "@/components/SplashScreen";

export default function IndexScreen() {
  const router = useRouter();

  return (
    <SplashScreen
      onSignup={() => router.push("/register")}
      onLogin={() => router.push("/login")}
    />
  );
}
