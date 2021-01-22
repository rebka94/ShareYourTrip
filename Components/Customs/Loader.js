import React from 'react'
import { ActivityIndicator, View } from 'react-native'



export default function Loader () {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating color={"purple"} size="small"/>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      position: 'absolute',
  
      top: 0,
      left: 0,
  
      height: '100%',
      width: '100%',
  
      justifyContent: 'center',
      alignItems: 'center'
    }
  })