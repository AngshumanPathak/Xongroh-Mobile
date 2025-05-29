import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScreenWrapper: React.FC<PropsWithChildren> = ({children}) => {

    const {top} = useSafeAreaInsets();
    const paddingTop = top >0 ? top+5 : 30; // Fallback to 20 if top is 0
  return (
    <View style = {{flex:1 , paddingTop, backgroundColor: '#ffffff'}}>
      {
        children
      }
    </View>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({})