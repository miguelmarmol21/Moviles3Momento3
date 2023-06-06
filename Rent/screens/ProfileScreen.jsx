import { Text,View } from "react-native"
import { styles } from "../assets/styles/styles"
import { Button } from "react-native-paper";
import { useState } from "react";

export default function ProfileScreen({navigation}){

    return (
    <View style = {styles.container}>
        <Text style={{fontFamily:'Arial',fontSize:30,marginTop:10}}>Bienvenido</Text>
        <Text style={{fontFamily:'Arial',fontSize:20,marginTop:10}}>Que desea hacer</Text>
        <Button
            style={{marginTop:10}}
            textColor="#0265FE"
            onPress={()=>{
                navigation.navigate('Rent')
            }}
        >Rentar un carro</Button>
        <Button
            style={{marginTop:10}}
            textColor="#0265FE"
            onPress={()=>{
                navigation.navigate('CarReturn')
            }}
        >Devolver un carro</Button>
        <Button
            style={{marginTop:10}}
            textColor="#0265FE"
            onPress={()=>{
                navigation.navigate('ListCar')
            }}
        >Ver Carror Disponibles</Button>
    </View>
    );
}