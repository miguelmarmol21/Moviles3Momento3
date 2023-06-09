import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import LoginScreen from './screens/LoginScreen';
import HomeTabs from './screens/HomeTabs';
import RegisterScreen from './screens/RegisterScreen';
import CarScreen from './screens/CarScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import NewPasswordUserScreen from './screens/NewPasswordUserScreen';
import ListCar from './screens/ListCarsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'
        screenOptions={{
          headerShown:false,
        }}>
        <Stack.Screen name='Login' component={LoginScreen} options={{title:'Renta de Carros', unmountOnBlur: true}}/>
        <Stack.Screen name='Register' component={RegisterScreen} options={{title:'Renta de Carros'}}/>
        <Stack.Screen name='HomeTabs' component={HomeTabs} options={{title:'Momentoll'}}/>
        <Stack.Screen name='NewPasswordUserScreen' component={NewPasswordUserScreen} options={{title:'Renta de Carros'}}/>
        <Stack.Screen name='NewPasswordScreen' component={NewPasswordScreen} options={{title:'Renta de Carros'}}/>
        <Stack.Screen name='Car' component={CarScreen} options={{title:'Renta de Carros'}}/>
        <Stack.Screen name='ListCar' component={ListCar} options={{title:'Renta de Carros'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
