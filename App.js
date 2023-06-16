import * as React from 'react';


import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Cars from './components/cars';
import Rent from './components/rent';
import LogIn from './components/logIn';
import SignIn from './components/signIn';
import PasswordRecovery from './components/passwordRecovery';
import ReturnCar from './components/returnCar';

const Stack = createNativeStackNavigator();
function App(){

  return (
   <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={LogIn} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery}/>
        <Stack.Screen name='Signin' component={SignIn}/>
        <Stack.Screen name='Cars' component={Cars}/>
        <Stack.Screen name='Rent' component={Rent}/>
        <Stack.Screen name='ReturnCar' component={ReturnCar}/>
      </Stack.Navigator>
   </NavigationContainer>
    
  );
}

export default App;