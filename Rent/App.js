import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import RentScreen from './screens/RentScreen';
import CarScreen from './screens/CarScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import CarReturn from './screens/CarReturnScreen'
import ListCar from './screens/ListCarsScreen'

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
        <Stack.Screen name='Profile' component={ProfileScreen} options={{title:'Renta de Carros'}}/>
        <Stack.Screen name='NewPassword' component={NewPasswordScreen} options={{title:'Renta de Carros'}}/>
        <Stack.Screen name='Rent' component={RentScreen} options={{title:'Renta de Carros'}}/>
        <Stack.Screen name='Car' component={CarScreen} options={{title:'Renta de Carros'}}/>
        <Stack.Screen name='CarReturn' component={CarReturn} options={{title:'Renta de Carros'}}/>
        <Stack.Screen name='ListCar' component={ListCar} options={{title:'Renta de Carros'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
