import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogInFormValidation } from "@/lib/schemas/schema";
import { z } from "zod";
import { useUserContext } from "@/context/AuthContext";
import { useSignInAccount, useLoginWithGoogle } from "@/lib/tanstack/userQueries";
import Toast from 'react-native-toast-message';
import { useRouter } from "expo-router";

const Login = () => {
  
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const router = useRouter();
  

  // Queries
  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount();
  const { mutateAsync: loginWithGoogle } = useLoginWithGoogle();



 


  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof LogInFormValidation>>({
    resolver: zodResolver(LogInFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleSignin = async () => {
    setIsGoogleSignIn(true);
  
    try {
      await loginWithGoogle(); 
    } catch (error) {
      console.error('Google OAuth failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Google Sign-In Failed',
        text2: 'Please try again later.',
        });
    } finally {
      reset();
     
    }
  };

  const handleSignin = async (user: z.infer<typeof LogInFormValidation>) => {
    try {
      const session = await signInAccount(user);
  
      if (!session) {
        Toast.show({ type: 'error', text1: 'Login failed. Please try again.' });
        return;
      }
  
      const isLoggedIn = await checkAuthUser();
  
      if (isLoggedIn) {
        reset();
        Toast.show({ type: 'success', text1: 'Signin successful!' });
        router.navigate('/auth/Signup'); // or navigation.navigate('Home') if using React Navigation
      } else {
        throw new Error('Authentication failed after sign-in');
      }
    } catch (error: unknown) {
      if (error instanceof Error && 'message' in error) {
        Toast.show({ type: 'error', text1: error.message || 'Sign-in failed. Please try again!' });
      } else {
        Toast.show({
          type: 'error',
          text1: 'An unexpected error occurred',
        });
      }
    }
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView className="flex-1 bg-black px-6">
      {/* Background Image */}
      <Image
        source={images.loginBGImage}
        className="absolute w-full h-full opacity-20"
        resizeMode="cover"
      />

      {/* Content */}
      <View className="min-h-screen justify-center z-10">
        {/* Header */}
        <View className="items-center mb-6">
          <Image source={images.logo} className="w-24 h-24 rounded-full mb-4" />
          <Text className="text-3xl font-bold text-white mb-2">Login</Text>
          <Text className="text-gray-400 text-lg text-center">
            Welcome back! Please enter your details.
          </Text>
        </View>

        {/* Form Fields */}
        <View>
          {/* Email Input */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <TextInput
                  placeholder="Email"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="bg-neutral-900 text-white p-4 rounded-lg border border-neutral-700"
                />
                {errors.email && (
                  <Text className="text-red-500 mt-1">{errors.email.message}</Text>
                )}
              </View>
            )}
          />

          {/* Password Input */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <TextInput
                  placeholder="Password"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  secureTextEntry
                  className="bg-neutral-900 text-white p-4 rounded-lg border border-neutral-700"
                />
                {errors.password && (
                  <Text className="text-red-500 mt-1">{errors.password.message}</Text>
                )}
              </View>
            )}
          />

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit(handleSignin)}
            activeOpacity={0.8}
            className="bg-purple-500 p-4 rounded-xl mt-2"
          >
            <Text className="text-white text-center text-base font-semibold">
              Login
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-neutral-700" />
          <Text className="text-neutral-400 mx-4">Or</Text>
          <View className="flex-1 h-px bg-neutral-700" />
        </View>

        {/* Google Button */}
        <Pressable className="flex-row items-center justify-center bg-neutral-800 p-4 rounded-lg border border-neutral-700 mb-6">
          <Image
            source={icons.google}
            className="w-5 h-5 mr-3"
            resizeMode="contain"
          />
          <Text className="text-white text-base font-semibold">
            Continue with Google
          </Text>
        </Pressable>

        {/* Sign Up Link */}
        <Text className="text-neutral-400 text-center">
          Don’t have an account?{" "}
          <Text
            className="text-purple-400 font-semibold"
            onPress={() => console.log("Sign up pressed")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;
