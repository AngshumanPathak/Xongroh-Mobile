import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { images } from "@/constants/images";
import { useRef, useState } from "react";

const INITIAL_DELAY = 60; // 60 seconds for first 3 attempts
const EXTENDED_DELAY = 120; // 120 seconds for last 2 attempts

const EnterOtp = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<Array<TextInput | null>>([]);

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
        activeOpacity={0.7}
        className="w-full" // Decreases opacity when pressed
      >
        <Text className="text-center bg-purple-400 text-white p-4 rounded-xl mt-4 w-full font-semibold">
          Verify OTP
        </Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default EnterOtp;

const styles = StyleSheet.create({});
