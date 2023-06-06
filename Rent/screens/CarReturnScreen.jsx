import { Text, View, Picker } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from 'react-hook-form';
import { styles } from "../assets/styles/styles";
import { useState } from "react";
import axios from 'axios';

export default function ProfileScreen({navigation}){
    const [messageProfile, setMessageProfile] = useState("");
    const [rents, setRents] = useState([]);

    const URL = 'http://127.0.0.1:3600'

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            rentNumber: '',
            returnDate: '',
        }
      });

    const   getRent = async () =>{
      const response = await axios.get(`${URL}/rent`);
      setRents(response.data)
     }

    
    return (
    <View style = {styles.container}>
        <Text style={{fontFamily:'Arial',fontSize:30,marginTop:10}}>Estamos en Devolucion</Text>
        <Picker
        style={styles.picker}
      >
        <Picker.Item label=""/>
        { 
          rents.map(rent => <Picker.Item key={rent.plateRent} label={rent.plateRent} value={rent.plateRent}/>)
        }
      </Picker>
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
          label="Nro Renta"
          mode="outlined"
          left={<TextInput.Icon icon="date"/>}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
        )}
        name="rentNumber"
        />
        {errors.rentNumber && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}
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
          label="Fecha Devolucion"
          mode="outlined"
          left={<TextInput.Icon icon="date"/>}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
        )}
        name="returnDate"
        />
        {errors.returnDate && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}
        <Button
          style={{ marginTop: 15, marginEnd: 10 }}
          icon="share"
          mode="contained"
          buttonColor="#0265FE"
          onPress={getRent}
        >Buscar</Button>
        <Button
            style={{marginTop:10}}
            textColor="#0265FE"
            onPress={()=>{
                navigation.navigate('Profile')
            }}
        >Volver</Button>
        <Button
            style={{marginTop:10}}
            textColor="#0265FE"
            onPress={()=>{
                navigation.navigate('Login')
            }}
        >Cerrar Sesión</Button>
    </View>
    );
}