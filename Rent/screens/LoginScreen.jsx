import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from 'react-hook-form';
import { useState } from "react";
import { styles } from "../assets/styles/styles";
import axios from 'axios';

export default function LoginScreen({navigation}) {
    const [showPass,setShowPass] = useState(false)
    const [errorMess,setErrorMess] = useState('');

    const URL = 'http://127.0.0.1:3600'

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
          userName: '',
          password: ''
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
        
    const onSignIn = (data)=>{
        const {userName, password} = data;
        const users = getValuesArrayUser();
        users.then((values) => {
            let findUser = values.find(value => value.userName == userName  && value.password == password)
            if(findUser != undefined){
                setErrorMess('Iniciando Sesion')
                setTimeout(()=>{
                navigation.navigate('Profile')
                },3000)
            }else{
                setErrorMess('Usuario y/o Contraseña INVALIDA')
            }
        }).catch((Error) =>{
            setErrorMess('Usuario y/o Contraseña INVALIDA')
        })
    }
    
    return (
        <View style={[styles.container]}>
            <Text style={{fontFamily:'Arial',fontSize:40}}>Inicia sesión</Text>
            <Text style={{fontFamily:'Arial',fontSize:15,marginTop:10}}>Utiliza tu cuenta de RentCar</Text>
            <Controller
                control={control}
                    rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.texinput}
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
            {errors.userName && <Text style={{ color: 'red' }}>Digite el usuario</Text>}
            
            <Controller
                control={control}
                    rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.texinput}
                    activeOutlineColor="#0265FE"
                    outlineColor="#919191"
                    label="Contraseña"
                    mode="outlined"
                    right={<TextInput.Icon icon={showPass ? "eye-off":"eye"} onPress={()=>setShowPass(!showPass)}/>}
                    secureTextEntry={!showPass}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
                )}
              name="password"
            />
            {errors.password && <Text style={{ color: 'red' }}>Digite la contraseña</Text>}
            <View style={[{ backgroundColor: "#fff", flexDirection: "row",marginTop:20 }]}>
            <Button
                style={{marginTop:10,marginEnd: 10}}
                textColor="#0265FE"
                onPress={()=>{
                    setTimeout(()=>{
                        setErrorMess('')
                        navigation.navigate('Register')
                    },1000)
                }}
            >Registrarse</Button>
            <Button
                style={{marginTop:10}}
                icon="login"
                mode="contained"
                buttonColor="#0265FE"
                onPress={handleSubmit(onSignIn)}
            >Iniciar Sesión</Button>
            </View>
            <Button
                style={{marginTop:10}}
                textColor="#0265FE"
                onPress={()=>{
                    navigation.navigate('NewPassword')
                }}
            >¿Olvidaste la contraseña?</Button>
            <Text style={{fontFamily:'Arial',fontSize:15,marginTop:20,color:'red'}}>{errorMess}</Text>
        </View>
    );
}

const defaultFormValues = () =>{
    return { userName: "", password:"" }
}