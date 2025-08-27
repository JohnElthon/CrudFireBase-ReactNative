import {FormUser} from './src/formUser'
import { StyleSheet , Text , View } from 'react-native'
 
 
export default function App(){
  return(
    <View style = {styles.container}>
      <FormUser></FormUser>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container:{
    flex:1
  }
})
  
