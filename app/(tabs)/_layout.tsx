import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import TopNavBar from '@/components/TopNavBar'
import {LinearGradient} from 'expo-linear-gradient'

const TabIcon = ({ focused, icon, title }: any) => {
  
  if(focused) {
    return (
        <>
           <LinearGradient
        colors={['#4f46e5', '#3b82f6']} // Customize your gradient colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex flex-column justify-center items-center rounded-full p-2"
      >
        <Image source={icon} className="size-5" />
        
      </LinearGradient>
      <Text className="text-white ml-2">{title}</Text>
        </>
        
      
  )}

    return (
        <View className='size-full justify-center items-center mt-4 rounded-full'>
            <Image source = {icon} tintColor="#A8B5DB" className = "size-5"/>
            <Text className="text-violet-800 ml-2">{title}</Text>
        </View>
    )

}

const _layout = () => {
  return (
    <>
    
       <TopNavBar/>
    
    
        <Tabs
      screenOptions={
        {
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                
            },

            tabBarStyle: {
                backgroundColor: '#101012',            
                height: 80,
                width: '100%',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#101012',
                paddingTop: 12,
                
                
            }


        }  
      }>
        <Tabs.Screen name = "index" options={{ title: "Home",headerShown: false, 
         tabBarIcon: ({ focused }) => (
            <TabIcon focused = {focused} icon = {icons.home} title="Home" />
        )
    }} />
        <Tabs.Screen name = "explore" options={{ title: "Explore",headerShown: false, 
            tabBarIcon: ({ focused }) => (
                <TabIcon focused = {focused} icon = {icons.explore} title="Explore" />
            )
        }} />
        <Tabs.Screen name = "circle" options={{ title: "Circle",headerShown: false, 
            tabBarIcon: ({ focused }) => (
                <TabIcon focused = {focused} icon = {icons.circle} title="Circle" />
            )
        }} /> 
        <Tabs.Screen name = "events" options={{ title: "Events",headerShown: false, 
            tabBarIcon: ({ focused }) => (
                <TabIcon focused = {focused} icon = {icons.events} title="Events" />
            )
        }} />
        <Tabs.Screen name = "create" options={{ title: "Create",headerShown: false, 
            tabBarIcon: ({ focused }) => (
                <TabIcon focused = {focused} icon = {icons.create} title="Create" />
            )
        }} />
    </Tabs>
    </>
    
  )
}

export default _layout

const styles = StyleSheet.create({})