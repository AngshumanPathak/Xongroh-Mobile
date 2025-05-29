import { StyleSheet, Text, View, Button } from 'react-native'
import {useEffect} from 'react'
import { useRouter } from 'expo-router'
import ScreenWrapper from '@/components/ScreenWrapper'

import { databases, appwriteConfig } from '@/lib/appwrite/config'

const index = () => {

    const router = useRouter()
  return (
    <ScreenWrapper>
      <Text>index</Text>
      <Button onPress={() => router.push('/(auth)/Login')} title="Go to Login" />
    </ScreenWrapper>
  )
}

export default index

const styles = StyleSheet.create({})