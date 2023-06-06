import { Text,View } from "react-native"
import { styles } from "../assets/styles/styles"
import { Button } from "react-native-paper";

export default function ProfileScreen({navigation}){

    
    return (
    <View style = {styles.container}>
        <Text style={{fontFamily:'Arial',fontSize:30,marginTop:10}}>Estamos en Lista de carros</Text>
        <Button
            style={{marginTop:10}}
            textColor="#0265FE"
            onPress={()=>{
                navigation.navigate('Profile')
            }}
        >Volver</Button>
    </View>
    );
}