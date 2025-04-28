import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  Linking,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { SignUpFormSchema } from "@/lib/schemas/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signup = () => {
  const [checked, setChecked] = React.useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView>
      <Image
        source={images.loginBGImage}
        className="absolute w-full h-full opacity-20"
        resizeMode="cover"
      />
      <View className="flex-1 justify-center items-center px-6 z-10">
        <View className="items-center mb-6">
          <Image source={images.logo} className="w-24 h-24 rounded-full mb-4" />
          <Text className="text-3xl font-bold text-white mb-4">
            Create Account
          </Text>
          <Text className="text-gray-400 text-lg mb-4">
            A fresh journey is just getting underway!
          </Text>
        </View>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#6B7280"
          className="bg-neutral-900 border border-neutral-400 p-4 w-full rounded-xl mb-4 text-white"
          onChangeText={(text) => setValue("name", text)}
        />
        <TextInput
          placeholder="Hometown"
          placeholderTextColor="#6B7280"
          className="bg-neutral-900 border border-neutral-400 p-4 w-full rounded-xl mb-4 text-white"
          onChangeText={(text) => setValue("hometown", text)}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#6B7280"
          className="bg-neutral-900 border border-neutral-400 p-4 w-full rounded-xl mb-4 text-white"
          onChangeText={(text) => setValue("email", text)}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#6B7280"
          secureTextEntry
          className="bg-neutral-900 border border-neutral-400 p-4 w-full rounded-xl mb-4 text-white"
          onChangeText={(text) => setValue("password", text)}
        />

        <View className="flex-row items-start p-4">
          <Pressable onPress={() => setChecked(!checked)} className="mr-2 mt-1">
            <View className="w-5 h-5 rounded-sm border border-white items-center justify-center">
              {checked && (
                <Text className="text-black text-xs bg-primary-500">✔️</Text>
              )}
            </View>
          </Pressable>
          <Text className="text-white flex-1 text-base">
            I have read and agreed to the{" "}
            <Text
              className="text-purple-400 underline"
              onPress={() => handleLinkPress("https://xongroh.com/privacy")}
            >
              Privacy Policy
            </Text>
            ,{" "}
            <Text
              className="text-purple-400 underline"
              onPress={() => handleLinkPress("https://xongroh.com/terms")}
            >
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text
              className="text-purple-400 underline"
              onPress={() => handleLinkPress("https://xongroh.com/guidelines")}
            >
              Community Guidelines
            </Text>
            .
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.7}
          className="w-full" // Decreases opacity when pressed
        >
          <Text className="text-center bg-purple-400 text-white p-4 rounded-xl mt-4 w-full font-semibold">
            Sign Up
          </Text>
        </TouchableOpacity>

        <View className="w-full items-center p-6">
          {/* Divider */}
          <View className="flex-row items-center w-full mb-6">
            <View className="flex-1 h-px bg-neutral-700" />
            <Text className="text-neutral-400 mx-4">Or</Text>
            <View className="flex-1 h-px bg-neutral-700" />
          </View>

          {/* Google Button */}
          <Pressable className="flex-row items-center justify-center w-full bg-neutral-800 p-4 rounded-lg border border-neutral-700 mb-6">
            <Image
              source={icons.google}
              className="w-5 h-5 mr-3 bg-transparent"
              resizeMode="contain"
            />
            <Text className="text-white text-base font-semibold bg">
              Continue with Google
            </Text>
          </Pressable>

          {/* Sign In Link */}
          <Text className="text-neutral-400">
            Already have an account?{" "}
            <Text
              className="text-purple-400"
              onPress={() => console.log("Sign In pressed")}
            >
              Sign in
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default signup;

const styles = StyleSheet.create({});
