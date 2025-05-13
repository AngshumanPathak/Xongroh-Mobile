import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { images } from "@/constants/images";
import { useRef, useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { sendVerificationEmail, verifyOtp } from "@/lib/appwrite/apis/users"; // your custom resend and verify functions
import { useRouter } from "expo-router";
import {useUserContext} from "@/context/AuthContext"; 
import LazyLoader from "@/components/shared/LazyLoader";

const INITIAL_DELAY = 60; // 60 seconds for first 3 attempts
const EXTENDED_DELAY = 120; // 120 seconds for last 2 attempts
const MAX_ATTEMPTS = 5; // Maximum attempts allowed

const EnterOtp = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(INITIAL_DELAY);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();
  const {user, isLoading, isVerified, isAuthenticated} = useUserContext(); 

  const focusInput = (index: number) => {
    if (index >= 0 && index < inputs.current.length) {
      inputs.current[index]?.focus();
    }
  };

  const handleChangeText = (text: string, index: number) => {
    if (!text) return;

    const newOtp = [...otp];
    newOtp[index] = text[0]; // Only take the first character
    setOtp(newOtp);

    if (index < 5) focusInput(index + 1);
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index]) {
      focusInput(index - 1);
    }
  };


  useEffect(() => {
    if (!canResend && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }

    if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]

  

);

  const handleResendOtp = async () => {
    if (attempts >= MAX_ATTEMPTS) {
      Toast.show({ type: "error", text1: "Maximum resend attempts reached." });
      return;
    }
  
    try {
      await sendVerificationEmail(); // Call your custom backend API
      Toast.show({ type: "success", text1: "OTP resent to your email." });
  
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
  
      const newDelay = newAttempts > 2 ? EXTENDED_DELAY : INITIAL_DELAY;
      setTimer(newDelay);
      setCanResend(false);
    } catch (error) {
      console.error("Resend OTP failed:", error);
      Toast.show({ type: "error", text1: "Failed to resend OTP." });
    }
  };


  const handleVerify = async () => {
    const enteredOtp = otp.join("");
  
    if (enteredOtp.length < 6) {
      Toast.show({ type: "error", text1: "Please enter a valid 6-digit OTP." });
      return;
    }
  
    try {
      const success = await verifyOtp(enteredOtp); // Only send the OTP
  
      if (success) {
        Toast.show({ type: "success", text1: "OTP verified successfully!" });
        // Navigate to the next screen or main app
         // Adjust the route as needed
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error?.message || "OTP verification failed.",
      });
    }

    if (isLoading) {
    return (
      <View className="flex-center w-full min-h-screen">
        <LazyLoader src={""} alt={""}/>
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return router.replace("/auth/Login");
  }

  // Redirect if already verified
  if (isVerified) {
    return router.replace("/(tabs)");
  }
  };

  return (
    <View>
      <View className="flex-1 justify-center items-center">
        <Image source={images.logo} className="w-24 h-24 rounded-full mb-4" />
        <Text className="text-gray-400 text-lg mb-4">Enter OTP</Text>
      </View>

      <View className="flex-row justify-between items-center gap-2">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            className="w-12 h-12 text-center border-b border-gray-300 rounded-md text-xl mt-10"
          />
        ))}
      </View>



      <View className="mt-20">
      <TouchableOpacity
        onPress={handleVerify}
        activeOpacity={0.7}
        className="w-full" // Decreases opacity when pressed
      >
        <Text className="text-center bg-purple-400 text-white p-4 rounded-xl mt-4 w-full font-semibold">
          Verify OTP
        </Text>
      </TouchableOpacity>
      </View>
      <View className="mt-6 items-center">
        <Text className="text-gray-500">
          Didn’t get code?{" "}
          {canResend ? (
            <Text
              onPress={handleResendOtp}
              className="text-purple-600 font-semibold"
            >
              Resend
            </Text>
          ) : (
            `Wait ${timer}s`
          )}
        </Text>
      </View>
      
    </View>
  );
};

export default EnterOtp;

const styles = StyleSheet.create({});
