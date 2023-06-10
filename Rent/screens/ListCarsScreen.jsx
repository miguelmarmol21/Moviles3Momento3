import { Text, View, FlatList } from "react-native"
import { styles } from "../assets/styles/styles"
import { Button } from "react-native-paper";
import { useState } from "react";
import axios from 'axios';

export default function ProfileScreen({navigation}){

    const [data,setData] = useState([])

    const URL = 'http://127.0.0.1:3600'

    const getCars = async () =>{
        const response = await axios.get(`${URL}/cars`);
        setData(response.data)
    }
    return (
    <View style = {styles.container}>
        <Text style={{fontFamily:'Arial',fontSize:25,marginTop:15}}>Estamos en Lista de carros</Text>
        <Button
                style={{marginTop:10}}
                buttonColor="#0265FE"
                icon='view-list'
                mode='contained'
                onPress={getCars}
        >Listar Carros</Button>
        <Button
            textColor="#0265FE"
            onPress={()=>{
                navigation.navigate('Profile')
            }}
        >Volver</Button>
        <FlatList 
            data={data}
            style={{marginTop:10}}
            renderItem={({ item }) => 
            <Text style={{marginTop:10}}>
                Nro Placa: {item.plateNumber}{"\n"}
                Marca: {item.brand}{"\n"}
                Estado: {item.statusCar ? 'Disponible':'No Disponible'}{"\n"}
                Valor Diario: {item.dailyvalue}{"\n"}
            </Text>}
        />
    </View>
    );
}