import { Text, View, Image } from "react-native"
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../assets/styles/styles";
import { useState } from "react";
import axios from 'axios';

export default function NewPasswordUserScreen({navigation}){

    const [errorMessage, setErrorMessage] = useState('')

    const URL = 'http://127.0.0.1:3600'

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
          userName: ''
        }
      });
      
    //Funcion que obtiene los datos
    const getValuesArrayUser = async () =>{
        let values = await axios.get(`${URL}/users`);
        return new Promise((resolve, reject) =>{
            if(values.length === 0){
                reject(new Error('No existen datos'))
            }
            else{
                setTimeout(()=>{ 
                    resolve(values.data);
                },1500)
            }
        });
    }

    const onSearchUser = (data)=>{
        const { userName } = data;
        const user = getValuesArrayUser()
        user.then((values)=>{
            let findUser = values.find(value => value.userName == userName)
            if(findUser != undefined){
                setErrorMessage('Verificando usuario')
                AsyncStorage.setItem('keyUser', JSON.stringify(findUser._id))
                setTimeout(()=>{
                    navigation.navigate('NewPasswordScreen')
                },3500)
            }else{
                setErrorMessage('Usuario no existe')
            }

        })
    }

    return (
    <View style = {styles.container}>
        <View style = {[styles.view,{flex:2}]}>
            <LoginBanner name="car"></LoginBanner>
        </View>
        <View style = {[styles.view,{flex:4}]}>
            <Text style={{fontFamily:'Arial',fontSize:25}}>¿Olvidaste la contraseña?</Text>
            <Text style={{fontFamily:'Arial',fontSize:20}}>Ingresa tu usuario</Text>
            <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.texinputOthers}
                  activeOutlineColor="#0265FE"
                  outlineColor="#919191"
                  label="Usuario"
                  mode="outlined"

                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                )}
              name="userName"
            />
            {errors.userName && <Text style={{ color: 'red' }}>Digite un usuario</Text>}
            <View style={[{ backgroundColor: "#fff", flexDirection: "row",marginTop:20 }]}>
            <Button
              style={{ marginTop: 10, marginEnd: 10 }}
              buttonColor="#0265FE"
              icon="check-bold" 
              mode="contained" 
              onPress={handleSubmit(onSearchUser)}
            >Verificar</Button>
            <Button
                style={{marginTop:10}}
                textColor="#0076C2"
                onPress={()=>{
                navigation.navigate('Login')
                setValue('')
            }}
            >Regresar</Button>
            </View>
            <Text style={{fontFamily:'Arial',fontSize:15,marginTop:20,color:'red'}}>{errorMessage}</Text>
        </View>
    </View>
    );
}

function LoginBanner(props) {
    return (
        <Image style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} source={require(`../assets/${props.name}.png`)}>
        </Image>
    );
  }