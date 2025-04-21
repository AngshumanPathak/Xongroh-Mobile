import {Text, View, Image } from 'react-native'
import React from 'react'
import UserAvatar from 'react-native-user-avatar'
import { icons } from '@/constants/icons'

const PostCard = () => {
  return (
    <View className="bg-[#1A1A1D] border border-light-3 rounded-2xl p-4 mb-4 shadow-md w-full">
      
    {/* Top row: Avatar + Name + Badge */}
    <View className="flex-row items-center justify-between mb-2">
      <View className="flex-row items-center space-x-3">
        
        <View className='flex-row'>
            <UserAvatar
                size={50}
                name="Jay Art"
                src=""/>
          <View className='ml-3'>
              <Text className="text-white text-xl font-semibold">Jay Art</Text>
              <Text className="text-xs text-gray-400">12 hrs ago</Text>
          </View>          
        </View>
      </View>
      

      {/* Creation Tag */}
      <View className="bg-purple-700 px-3 py-1 rounded-full">
        <Text className="text-white text-xs font-medium">Creation</Text>
      </View>
    </View>

    {/* Title */}
    <Text className="text-white mt-4">Digital art ❤️</Text>

    {/* Image */}
    <Image 
      source={{ uri: 'https://i.postimg.cc/25w9sQpp/DAAG-poster.jpg' }} // Replace with your image URL
      className="w-full h-80 rounded-lg mt-4"
      resizeMode="cover"
      />
    
    {/* Tags */}
    <View className="flex-row mt-3 gap-2">
       <Text className="text-white bg-light-4 px-3 py-1 rounded-full text-sm">Art</Text>
       <Text className="text-white bg-light-4 px-3 py-1 rounded-full text-sm">Design</Text>
    </View>

    {/* Bottom icons */}
    <View className='flex-row justify-between'>
      
      {/* Left */}
      <View className='flex-row gap-4'>
       <View className='flex-row items-center mt-4 gap-0.5'>
           <Image source={icons.like} className="w-10 h-10 mt-4" resizeMode="contain" />
           <Text className='text-light-2 text-xl mt-3'>7</Text>
       </View>
       <View className='flex-row items-center mt-4 gap-0.5'>
           <Image source={icons.comment} className="w-8 h-8 mt-4" resizeMode="contain" />
           <Text className='text-light-2 text-xl mt-3'>10</Text>
       </View>
       </View>
       
        {/* Right */}
       <View className='flex-row gap-2 mt-4'>
            <Image source={icons.save} className="w-8 h-8 mt-4" resizeMode="contain" />
            <Image source={icons.share} className="w-8 h-8 mt-4" resizeMode="contain" />
       </View>
    </View>
   
  </View>
  )
}

export default PostCard

