import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';
import RentScreen from './RentScreen';
import CarReturnScreen from './CarReturnScreen'

const Tab = createBottomTabNavigator();

export default function HomeTabs({navigation}) {
    return(
    <Tab.Navigator initialRouteName='Rent'
        screenOptions={{
            headerShown:false,
            tabBarActiveTintColor:'#000000',
            tabBarInactiveTintColor:'#000000',
            tabBarActiveBackgroundColor:'#D2EDFF',
        }}>
        <Tab.Screen name='Rent' component={RentScreen} options={{tabBarIcon:() => (<MaterialIcons color={'#0265FE'} name="car-rental" size={30}/>)}}/>
        <Tab.Screen name ='Profile' component={ProfileScreen} options={{tabBarIcon:() => (<MaterialIcons color={'#0265FE'} name="home" size={30}/>)}}/>
        <Tab.Screen name='CarReturn' component={CarReturnScreen} options={{headerShadowVisible:false,tabBarIcon:() => (<MaterialIcons color={'#0265FE'} name="assignment-return" size={30}/>)}}/>
    </Tab.Navigator>
    );
}
