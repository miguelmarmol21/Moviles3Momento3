import { Text,View } from "react-native"
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from 'react-hook-form';
import { styles } from "../assets/styles/styles";
import { useState } from "react";

export default function NewPasswordScreen({navigation}){

  const [message, setMessage] = useState('')

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
          userName: '',
          newPassword: '',
          confirmNewpassword: ''
        }
      });

      function showMessage(message,time=2000){
        setMessage(message);
        setTimeout(() => {
          setMessage('')
        }, time);
      }
    

    return (
    <View style = {styles.container}>
            <Text style={{fontFamily:'Arial',fontSize:25}}>¿Olvidaste la contraseña?</Text>
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
            {errors.userName && <Text style={{ color: 'red' }}>El Usuario es obligatorio</Text>}
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
                  label="Nueva Contraseña"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                )}
              name="newPassword"
            />
            {errors.newPassword && <Text style={{ color: 'red' }}>El nombre es obligatorio</Text>}
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
                  label="Confirmar Contraseña"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                )}
              name="confirmNewpassword"
            />
            {errors.confirmNewpassword && <Text style={{ color: 'red' }}>El nombre es obligatorio</Text>}
            <Button
              style={{ marginTop: 15, marginEnd: 10 }}
              buttonColor="#0265FE"
              icon="content-save" 
              mode="contained" 
              // onPress={handleSubmit(onSave)}
            >
              Guardar
            </Button>
            <Button
                textColor="#0076C2"
                onPress={()=>{
                navigation.navigate('Login')
                setValue('')
            }}
            >Regresar</Button>
    </View>
    );
}