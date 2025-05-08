import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Linking } from 'react-native';
import { z } from 'zod';
import { SignUpFormSchema } from '@/lib/schemas/schema'; 
import { images} from '@/constants/images'; 
import {icons} from '@/constants/icons';
import { useState } from 'react';
import { useCreateUserAccount } from '@/lib/tanstack/userQueries';
import { useUserContext } from '@/context/AuthContext';
import Toast from 'react-native-toast-message';

type SignUpFormData = z.infer<typeof SignUpFormSchema>;

const Signup = () => {

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [isEmailBlacklisted, setIsEmailBlacklisted] = useState(false);
  const [blacklistMessage, setBlacklistMessage] = useState('');
  


  //Queries
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: '',
      hometown: '',
      email: '',
      password: '',
    },
  });

  
  const blacklistedDomains = process.env.VITE_BLACKLISTED_DOMAINS
    ? process.env.VITE_BLACKLISTED_DOMAINS.split(',')
    : [];

  const blacklistedEmails = process.env.VITE_BLACKLISTED_EMAILS
    ? process.env.VITE_BLACKLISTED_EMAILS.split(',')
    : [];

  const checkIfEmailIsBlacklisted = (email: string) => {
    if (!email) return false;

    const emailLower = email.toLowerCase();

    // Only attempt to split if @ is present to avoid errors
    const atIndex = emailLower.indexOf('@');
    if (atIndex === -1) return false;

    // Safely construct the base email (without + attribution)
    let emailBase = emailLower;
    const plusIndex = emailLower.substring(0, atIndex).indexOf('+');
    if (plusIndex !== -1) {
      // This handles the + attribution technique
      emailBase =
        emailLower.substring(0, plusIndex) + emailLower.substring(atIndex);
    }

    // Check for exact blacklisted emails
    if (
      blacklistedEmails.includes(emailLower) ||
      blacklistedEmails.includes(emailBase)
    ) {
      setIsEmailBlacklisted(true);
      setBlacklistMessage(
        'This email has been suspended due to suspicious activity.'
      );
      return true;
    }

    // Check for blacklisted domains
    const domain = emailLower.split('@')[1];
    if (domain && blacklistedDomains.includes(domain)) {
      setIsEmailBlacklisted(true);
      setBlacklistMessage(
        'Emails from this domain are not allowed due to spam concerns.'
      );
      return true;
    }

    setIsEmailBlacklisted(false);
    setBlacklistMessage('');
    return false;
  };


  const handleSignup = async (user: z.infer<typeof SignUpFormSchema>) => {
    if (!termsAccepted) {
      setShowTermsError(true);
      return;
    }
    // Check if email is blacklisted
    if (checkIfEmailIsBlacklisted(user.email)) {
      Toast.show({
        type: 'error',
        text1: 'Email Blacklisted',
        text2: blacklistMessage,
      });
      return;
    }

    try {
      // Create user account
      const newUser = await createUserAccount(user);
      if (!newUser) throw new Error('Signup failed');

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        Toast.show({
          type: 'success',
          text1: 'Account Created',
          text2: 'Please verify your email to complete the signup process.',
        });
        reset();
        
      } else {
        throw new Error('Authentication failed after sign-up');
      }
    } catch (error: unknown) {
      if (error instanceof Error && 'message' in error) {
        Toast.show({ type: error.message || 'Sign-up failed, please try again!' });
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
    <ScrollView>
      <Image
        source={images.loginBGImage}
        className="absolute w-full h-full opacity-20"
        resizeMode="cover"
      />
      <View className="flex-1 justify-center items-center px-6 z-10">
        <View className="items-center mb-6">
          <Image source={images.logo} className="w-24 h-24 rounded-full mb-4" />
          <Text className="text-3xl font-bold text-white mb-4">Create Account</Text>
          <Text className="text-gray-400 text-lg mb-4">
            A fresh journey is just getting underway!
          </Text>
        </View>

        {/* Name */}
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              placeholder="Name"
              placeholderTextColor="#6B7280"
              value={field.value}
              onChangeText={field.onChange}
              className="bg-neutral-900 border border-neutral-400 p-4 w-full rounded-xl mt-4 text-white"
            />
          )}
        />
        {errors.name && <Text className="text-red">{errors.name.message}</Text>}

        {/* Hometown */}
        <Controller
          control={control}
          name="hometown"
          render={({ field }) => (
            <TextInput
              placeholder="Hometown"
              placeholderTextColor="#6B7280"
              value={field.value}
              onChangeText={field.onChange}
              className="bg-neutral-900 border border-neutral-400 p-4 w-full rounded-xl mt-4 text-white"
            />
          )}
        />
        {errors.hometown && <Text className="text-red">{errors.hometown.message}</Text>}

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              placeholder="Email"
              placeholderTextColor="#6B7280"
              value={field.value}
              keyboardType="email-address"
              onChangeText={field.onChange}
              className="bg-neutral-900 border border-neutral-400 p-4 w-full rounded-xl mt-4 text-white"
            />
          )}
        />
        {errors.email && <Text className="text-red">{errors.email.message}</Text>}

        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextInput
              placeholder="Password"
              placeholderTextColor="#6B7280"
              secureTextEntry
              value={field.value}
              onChangeText={field.onChange}
              className="bg-neutral-900 border border-neutral-400 p-4 w-full rounded-xl mt-4 text-white"
            />
          )}
        />
        {errors.password && <Text className="text-red">{errors.password.message}</Text>}


        {/* Terms Checkbox UI only */}
        <View className="flex-row items-start p-4">
          <Pressable onPress={() => setTermsAccepted(!termsAccepted)} className="mr-2 mt-1">
            <View className="w-5 h-5 rounded-sm border border-white items-center justify-center">
              {termsAccepted && (
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

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit(handleSignup)} activeOpacity={0.7} className="w-full">
          <Text className="text-center bg-purple-400 text-white p-4 rounded-xl mt-4 w-full font-semibold">
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Divider & Google */}
        <View className="w-full items-center p-6">
          <View className="flex-row items-center w-full mb-6">
            <View className="flex-1 h-px bg-neutral-700" />
            <Text className="text-neutral-400 mx-4">Or</Text>
            <View className="flex-1 h-px bg-neutral-700" />
          </View>

          <Pressable className="flex-row items-center justify-center w-full bg-neutral-800 p-4 rounded-lg border border-neutral-700 mb-6">
            <Image
              source={icons.google}
              className="w-5 h-5 mr-3 bg-transparent"
              resizeMode="contain"
            />
            <Text className="text-white text-base font-semibold">Continue with Google</Text>
          </Pressable>

          {/* Sign In Link */}
          <Text className="text-neutral-400">
            Already have an account?{' '}
            <Text className="text-purple-400" onPress={() => console.log('Sign In pressed')}>
              Sign in
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
