import { Text, View, Picker } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from 'react-hook-form';
import { useState } from "react";
import axios from 'axios';
import { styles } from "../assets/styles/styles";

export default function CarScreen({ navigation }) {
  const [errorMessage, setErrorMessage] = useState('')
  const [statusCar, setStatusCar] = useState('')

  const URL = 'http://127.0.0.1:3600'

  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      plateNumber: '',
      brand: '',
      dailyvalue: ''
    }
  });

  //Funcion que obtiene los datos
  const getValuesArrayCar = async () =>{
    let values = await axios.get(`${URL}/cars`);
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

  const onSaveCar = (data) =>{
    const {plateNumber, brand, dailyvalue} = data;
    const cars = getValuesArrayCar();
    cars.then(async (values)=>{
      let findCar = values.find(value => plateNumber == value.plateNumber)
      if(findCar != undefined){
        setErrorMessage('Numero de Placa ya esta asociado aun carro, inteta con otra placa')
      }else{
        const response = await axios.post(`${URL}/cars`,{
          plateNumber, 
          brand, 
          statusCar, 
          dailyvalue
        })
        if(response){
          setErrorMessage('Carro ingresado correctamente')
          setTimeout(()=>{
            navigation.navigate('Car')
        },3000)
        }else{
          setErrorMessage('Ocurrio un error registrando el carro, intenta mas tarde')
        }
      }
    })

  }
  
  return (
    <View style={[styles.container]}>
      <Text style={{fontFamily:'Arial',fontSize:40,marginTop:5}}>Agrega un Carro</Text>
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
            label="Nro Placa"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="plateNumber"
    />
    {errors.plateNumber && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}
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
          label="Marca"
          mode="outlined"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
      )}
      name="brand"
    />
    {errors.brand && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}
    <Picker
      style={styles.picker}
      onValueChange={statusCar => setStatusCar(statusCar)}
      value={statusCar}
    >
      <Picker.Item label="" />
      <Picker.Item label="Disponible" value="true" />
      <Picker.Item label="No Disponible" value="false"/>
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
          label="Valor Diario"
          mode="outlined"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
      )}
      name="dailyvalue"
    />
    {errors.dailyvalue && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}
    <Button
      style={{ marginTop: 15, marginEnd: 10 }}
      icon="share"
      mode="contained"
      buttonColor="#0265FE"
      onPress={handleSubmit(onSaveCar)}
    >Guardar Carro</Button>
    <Button
      style={{marginTop:10}}
      textColor="#0265FE"
      onPress={()=>{
        navigation.navigate('Login')
      }}
    >Cerrar Sesión</Button>
    <Text style={{fontFamily:'Arial',fontSize:15,marginTop:20,color:'red'}}>{errorMessage}</Text>
    </View>
  );
}