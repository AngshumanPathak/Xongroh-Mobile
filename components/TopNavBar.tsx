import { StyleSheet, View, Image, Text } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'



const TopNavBar = () => {
    
  return (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      width: '100%', 
      paddingHorizontal: 16, 
      paddingVertical: 12, 
      backgroundColor: '#101012'  
    }}>
      {/* Left: Logo + Title */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={images.logo}
          resizeMode="contain"
          
        />
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#D4AAFF',
          letterSpacing: 0.5,
        }}>
          ongroh
        </Text>
      </View>
    
      {/* Right: Icons */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <Image
          source={icons.message}
          resizeMode="contain"
          style={{ height: 30, width: 30 }}
        />
        <Image
          source={icons.notification}
          resizeMode="contain"
          style={{ height: 30, width: 30 }}
        />
      </View>
    </View>
  )
}

export default TopNavBar

const styles = StyleSheet.create({
  customText: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24 * 1.4, // 33.6
    color: '#D4AAFF', // Replace with your primary-500 color
    letterSpacing: 0.05 * 24, // 1.2
  },
})