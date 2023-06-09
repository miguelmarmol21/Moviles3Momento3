import { Text, View, Image } from "react-native"
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../assets/styles/styles";
import { useState } from "react";
import axios from 'axios';
import { size } from "lodash";

export default function NewPasswordScreen({navigation}){

    const [errorMessage, setErrorMessage] = useState('')
    const [showPass,setShowPass] = useState(false);
    const [showPassConf,setShowPassConf] = useState(false);

    const URL = 'http://127.0.0.1:3600'

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
          newPassword: '',
          confirmNewpassword: ''
        }
      });
    
    //Funcion que obtiene los datos
  const getIdUser = async () =>{
    let values = await AsyncStorage.getItem('keyUser')
    return new Promise((resolve, reject) =>{
      if(values.length === 0){
        reject(new Error('No existen datos'))
      }
      else{
        setTimeout(()=>{ 
          resolve(JSON.parse(values));
        },1500)
      }
    });
  }

  const onUpdatePassword = (data)=>{
    const { newPassword, confirmNewpassword } = data;
    const idUser = getIdUser();
    idUser.then(async (values)=>{
      console.log(values)
      if(size(newPassword)<6){
        setErrorMessage('Se debe Ingresar una contraseña de al menos de 6 caracteres')
      }else if(newPassword !== confirmNewpassword){
        setErrorMessage('Las contraseñas no coinciden')
      }else{
        const response = await axios.put(`${URL}/users/${values}`,{
          password: newPassword
        })
        if(response){
          setErrorMessage('Su contraseña ha sido actualizada ...')
          AsyncStorage.clear()
          setTimeout(()=>{
            navigation.navigate('Login')
          },3500)
        }
        else{
          setErrorMessage('Su contraseña no ha sido actualizada ...')
        }
      }
    })
  }

    return (
    <View style = {styles.container}>
      <View style = {[styles.view,{flex:2}]}>
        <LoginBanner name="car"></LoginBanner>
      </View>
      <View style = {[styles.view,{flex:4}]}>   
            <Text style={{fontFamily:'Arial',fontSize:25}}>Digita los datos</Text>
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
                  label="Nueva Contraseña"
                  mode="outlined"
                  right={<TextInput.Icon icon={showPass ? "eye-off":"eye"} onPress={()=>setShowPass(!showPass)}/>}
                  secureTextEntry={!showPass}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                )}
              name="newPassword"
            />
            {errors.newPassword && <Text style={{ color: 'red' }}>La contraseña es obligatoria</Text>}
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
                  label="Confirmar Contraseña"
                  mode="outlined"
                  right={<TextInput.Icon icon={showPassConf ? "eye-off":"eye"} onPress={()=>setShowPassConf(!showPassConf)}/>}
                  secureTextEntry={!showPassConf}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                )}
              name="confirmNewpassword"
            />
            {errors.confirmNewpassword && <Text style={{ color: 'red' }}>Este campo es obligatorio</Text>}
            <View style={[{ backgroundColor: "#fff", flexDirection: "row",marginTop:20 }]}>
            <Button
              style={{ marginTop: 10, marginEnd: 10 }}
              buttonColor="#0265FE"
              icon="content-save" 
              mode="contained" 
              onPress={handleSubmit(onUpdatePassword)}
            >
              Guardar
            </Button>
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