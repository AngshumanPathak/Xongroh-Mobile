import { ScrollView, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { appwriteConfig } from "@/lib/appwrite/config";






export default function Index() {

  
  const [selectedTab, setSelectedTab] = useState<"creations" | "saved">(
    "creations"
  );
  return (
    <ScrollView className="flex bg-[#101012] p-6">
      <Text className="text-white text-3xl font-bold ">Creation Feed</Text>
      <View className="flex-row py-4 px-6 gap-6 mt-6">
        {/* Creations Tab */}
        <Pressable
          onPress={() => setSelectedTab("creations")}
          className="items-center"
        >
          <Text
            className={`text-2xl font-bold ${
              selectedTab === "creations" ? "text-primary-500" : "text-white"
            }`}
          >
            Creations
          </Text>
          {selectedTab === "creations" && (
            <View className="h-[2px] bg-primary-500 w-full mt-1 rounded-full" />
          )}
        </Pressable>

        {/* Saved Tab */}
        <Pressable
          onPress={() => setSelectedTab("saved")}
          className="items-center"
        >
          <Text
            className={`text-2xl font-bold ${
              selectedTab === "saved" ? "text-primary-500" : "text-white"
            }`}
          >
            Saved
          </Text>
          {selectedTab === "saved" && (
            <View className="h-[2px] bg-primary-500 w-full mt-1 rounded-full" />
          )}
        </Pressable>
      </View>
      <View>
        
      </View>
      
      
    </ScrollView>
  );
}
