// app/_layout.tsx
import { Slot} from "expo-router";
import "./globals.css";
import { QueryProvider } from "@/lib/tanstack/QueryProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "../context/AuthContext";
import { useEffect } from "react";

import { databases } from "@/lib/appwrite/config"; // Ensure this path is correct




const RootLayout = () => {
  

  return (
    <SafeAreaProvider>
      
      <QueryProvider>

        <AuthProvider>
          <Slot/>
        </AuthProvider>
       
          
        
         
        
      </QueryProvider>
      
      
    </SafeAreaProvider>
  );
};

export default RootLayout;
