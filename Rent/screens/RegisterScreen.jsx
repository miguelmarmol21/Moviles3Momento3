import { Text, View, Picker } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { styles } from "../assets/styles/styles";
import { validateEmail } from "../utils/helpers";
import axios from 'axios';
import { size } from "lodash";

export default function RegisterScreen({navigation}) {

    const [errorMessage, setErrorMessage] = useState()
    const [showPass,setShowPass] = useState(false);
    const [showPassConf,setShowPassConf] = useState(false);
    const [role, setRole] = useState('')

    const URL = 'http://127.0.0.1:3600'

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
          names: '',
          email: '',
          userName: '',
          password: '',
          confPassword:'',
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


  const onSave =  (data) =>{
    const { names, email, userName, password, confPassword} = data;
    const rol = role
    const users = getValuesArrayUser()
    users.then(async (values)=>{
      let findArrayUser = values.find(value => userName == value.userName)
      let findArrayEmail = values.find(value => email == value.email)
      if(findArrayEmail != undefined){
        setErrorMessage('Correo electronico ya fue registrado, intenta con otro')
      }else if(findArrayUser != undefined){
        setErrorMessage('Usuario ya fue registrado, intenta con otro')
      }else if(!validateEmail(email)){
        setErrorMessage('Se debe Ingresar un Email Valido')
      }else if(size(password)<6){
        setErrorMessage('Se debe Ingresar una contraseña de al menos de 6 caracteres')
      }else if(password !== confPassword){
        setErrorMessage('Las contraseñas no coinciden')
      }else{
        const response = await axios.post(`${URL}/users`,{
          names, 
          email, 
          userName, 
          password,
          role
        })
        if(response){
          setErrorMessage('Registrado Exitosamente')  
          setTimeout(()=>{
              navigation.navigate('Login')
          },3000)
        }
        else{
          setErrorMessage('Ocurrio un error registrando al usuario, intenta mas tarde')
        }
      }
    })
  }


    return (
        <View style={[styles.container]}>
            <Text style={{fontFamily:'Arial',fontSize:40,marginTop:5}}>Crea tu cuenta</Text>
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
                  label="Nombres"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                )}
              name="names"
            />
            {errors.names && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}
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
                  left={<TextInput.Icon icon="account"/>}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                )}
              name="userName"
            />
            {errors.userName && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}
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
                  label="Correo Electronico"
                  mode="outlined"
                  left={<TextInput.Icon icon="account"/>}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                )}
              name="email"
            />
            {errors.email && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}
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
                  label="Contraseña "
                  mode="outlined"
                  left={<TextInput.Icon icon="key"/>}
                  right={<TextInput.Icon icon={showPass ? "eye-off":"eye"} onPress={()=>setShowPass(!showPass)}/>}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  secureTextEntry={!showPass}
                  value={value}
                />
                )}
              name="password"
            />
            {errors.password && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}
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
                  label="Confirmacion"
                  mode="outlined"
                  left={<TextInput.Icon icon="key"/>}
                  right={<TextInput.Icon icon={showPassConf ? "eye-off":"eye"} onPress={()=>setShowPassConf(!showPassConf)}/>}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  secureTextEntry={!showPassConf}
                  value={value}
                />
                )}
              name="confPassword"
            />
            {errors.confPassword && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}
            <Picker
              style={styles.picker}
              onValueChange={role => setRole(role)}
              value={role}
            >
              <Picker.Item label="" />
              <Picker.Item label="Administrador" value="0" />
              <Picker.Item label="Usuario" value="1"/>
            </Picker>
            <View style={[{ backgroundColor: "#fff", flexDirection: "row",marginTop:5 }]}>
            <Button
                style={{marginTop:20,marginEnd: 10}}
                icon="content-save"
                mode="contained"
                buttonColor="#0265FE"
                onPress={handleSubmit(onSave)}
            >Registrarse</Button>
            <Button
                style={{marginTop:20}}
                textColor="#0265FE"
                onPress={()=>{
                    setTimeout(()=>{
                        navigation.navigate('Login')
                    },1000)
                    setValue('')
            }}
            >Volver</Button>
            </View>
            <Text style={{fontFamily:'Arial',fontSize:15,marginTop:20,color:'red'}}>{errorMessage}</Text>
        </View>
    );
}
