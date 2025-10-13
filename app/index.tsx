import ComingSoonScreen from "@/components/coming-soon-screen";
import CourierOnboarding from "@/components/courier-onboarding";
import LoadingScreen from "@/components/loading-screen";
import WelcomeScreen from "@/components/welcome-screen";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

type AppState =
  | "loading"
  | "welcome"
  | "courier-onboarding"
  | "coming-soon"
  | "register"
  | "main";

export default function App() {
  const router = useRouter();
  const [appState, setAppState] = useState<AppState>("loading");

  useEffect(() => {
    // Simulate loading time
    const loadingTimer = setTimeout(() => {
      setAppState("welcome");
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleServiceSelect = (service: "courier" | "food-delivery") => {
    console.log("Selected service:", service);
    if (service === "courier") {
      setAppState("courier-onboarding");
    } else {
      // For food delivery, show coming soon screen
      setAppState("coming-soon");
    }
  };

  const handleOnboardingNext = () => {
    // Move to next onboarding screen or main app
    setAppState("main");
    router.replace("/(tabs)");
  };

  const handleOnboardingSkip = () => {
    // Skip onboarding and go to main app
    setAppState("main");
    router.replace("/(tabs)");
  };

  const handleOnboardingBack = () => {
    // Go back to welcome screen
    setAppState("welcome");
  };

  const handleComingSoonBack = () => {
    // Go back to welcome screen from coming soon
    setAppState("welcome");
  };


  if (appState === "loading") {
    return <LoadingScreen />;
  }

  if (appState === "welcome") {
    return <WelcomeScreen onServiceSelect={handleServiceSelect} />;
  }

  if (appState === "courier-onboarding") {
    return (
      <CourierOnboarding
        onNext={handleOnboardingNext}
        onSkip={handleOnboardingSkip}
        onBack={handleOnboardingBack}
      />
    );
  }

  if (appState === "coming-soon") {
    return <ComingSoonScreen onBack={handleComingSoonBack} />;
  }

  return null;
}
