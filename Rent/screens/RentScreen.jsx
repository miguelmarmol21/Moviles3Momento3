import { Text, View, Picker } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from "react";
import { styles } from "../assets/styles/styles";
import axios from 'axios';

export default function RentScreen({ navigation }) {
  const [errorMess, setErrorMess] = useState("");
  const [cars, setCars] = useState([]);

  const URL = 'http://127.0.0.1:3600'

  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      initialDate: '',
      finalDate: '',
      rentNumber: ''
    }
  });

  // useEffect(()=>{
  //   getCustomers()
  // },)

  const   getCustomers = async () =>{
    const response = await axios.get(`${URL}/rent`);
    setCars(response.data)
  }

  return (
    <View style={[styles.container]}>
      <Text style={{fontFamily:'Arial',fontSize:30,marginTop:10}}>Renta de Carros</Text>
      <Picker
        style={styles.picker}
      >
        <Picker.Item label=""/>
        { 
          cars.map(car => <Picker.Item key={car.plateRent} label={car.plateRent} value={car.plateRent}/>)
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
          label="Fecha Inicial "
          mode="outlined"
          left={<TextInput.Icon icon="date"/>}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
        )}
        name="initialDate"
        />
        {errors.initialDate && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}
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
          label="Fecha Final"
          mode="outlined"
          left={<TextInput.Icon icon="day"/>}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
        )}
        name="finalDate"
        />
        {errors.finalDate && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}
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
          label="Nro Renta "
          mode="outlined"
          left={<TextInput.Icon icon="day"/>}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
        )}
        name="rentNumber"
        />
        {errors.rentNumber && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}
      
      <View style={[{flexDirection: "row", marginTop:20 }]}>
        <Button
          style={{ marginTop: 15, marginEnd: 10 }}
          icon="share"
          mode="contained"
          buttonColor="#0265FE"
          onPress={getCustomers}
        >Buscar</Button>
      </View>
      <Text style={{fontFamily:'Arial',fontSize:15,marginTop:20,color:'red'}}>{errorMess}</Text>
    </View>
  );
}


