import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {images} from '@/constants/images'

const Login = () => {
  return (
    <ScrollView>
      <View>
        
        <View>
        <Image
        source={images.loginBGImage}
        className='w-full opacity-40'
        />
        </View>
        <View>

        </View>
        
      </View>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({})