import { Text,View, Image } from "react-native";
import { styles } from "../assets/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { useState, useEffect } from "react";

export default function ProfileScreen({navigation}){
    const [messageProfile, setMessageProfile] = useState("");
    const [contain, setContain] = useState(false);

    useEffect(()=>{
        userLogin()
    },[])

    const getUser = async () =>{
        let values = await AsyncStorage.getItem('keyProfile')
        return new Promise((resolve,  ) =>{
            if(values.length === 0){
                reject(new Error('No existen datos'))
            }else{
                setTimeout(()=>{
                    resolve(JSON.parse(values));
                },1000)
            }
        });
    }

    function userLogin(){
        let user = getUser()
        user
        .then((values)=>{
            setMessageProfile(`Bienvenido ${values.names}`)
            setTimeout(()=>{
                setContain(true)
            },2000)
        })
    }

    return (
    <View style = {[styles.container]}>
        <View style = {[styles.view,{flex:2}]}>
            <Banner name="car"></Banner>
        </View>
        <View style = {[styles.view,{flex:4}]}>
            <Text style={{fontFamily:'Arial',fontSize:25,marginTop:10}}>{messageProfile}</Text>
            {contain && (
                <Text style={{fontFamily:'Arial',fontSize:20,marginTop:10}}>Que deseas hacer</Text>
                
            )}
            {contain && (
                <Text style={{fontFamily:'Arial',fontSize:20,marginTop:10}}>Ver nuestros carros disponibles</Text>
            )}
            {contain && (
                <Button
                    textColor="#0265FE"
                    onPress={()=>{
                        navigation.navigate('ListCar')
                    }}
                >Ver Carros Disponibles</Button>
            )}
        </View>
    </View>
    );
}   

  function Banner(props) {
    return (
      <Image style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} source={require(`../assets/${props.name}.gif`)}>
      </Image>
    );
  }