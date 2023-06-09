import { Text, View, Picker } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from "react";
import { styles } from "../assets/styles/styles";
import axios from 'axios';

export default function RentScreen({ navigation }) {
  const [errorMessage, setErrorMessage] = useState('')
  const [cars, setCars] = useState([]);
  const [plateRent, setPlateRent] = useState('');

  const URL = 'http://127.0.0.1:3600'

  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      initialDate: '',
      finalDate: '',
      rentNumber: ''
    }
  });

  useEffect(()=>{
    getCarArray()
  },[])

  //Funcion que obtiene los datos
  const getValuesArrayRent = async () =>{
    let values = await axios.get(`${URL}/rents`);
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

  const   getCarArray = async () =>{
    const response = await axios.get(`${URL}/cars`);
    setCars(response.data)
  }

  const onSaveRent = (data)=>{
    const { initialDate, finalDate, rentNumber } = data;
    const rent = getValuesArrayRent()
    rent.then(async (values)=>{
      let findRent = values.find(value => value.rentNumber == rentNumber);
        if(findRent != undefined){
          setErrorMessage('Numero renta relacionado a otro registro');
        }else if(plateRent == undefined){
          setErrorMessage('Seleccione una placa')
        }else{
          const response = await axios.post(`${URL}/rents`,{
            plateRent,
            rentNumber,
            initialDate,
            finalDate,
            statusRent:true
          })
          if(response){
            onUpdateCarStatus()
          }else{
            setErrorMessage('Ocurrio un error intenta de nuevo ...') 
          }
        }
    })
  }

  const onUpdateCarStatus = async () =>{
    let findCar = cars.find(car => car.plateNumber == plateRent);
    const response = await axios.put(`${URL}/cars/${findCar._id}`,{
      statusCar:false
    })
    if(response){
      setErrorMessage('Renta guardada exitosamente ...') 
    }else{
      setErrorMessage('Ocurrio un error intenta de nuevo ...')
    }
  }

  return (
    <View style={[styles.container]}>
      <Text style={{fontFamily:'Arial',fontSize:30,marginTop:10}}>Renta de Carros</Text>
      <Picker
        style={styles.picker}
        onValueChange={plateRent => setPlateRent(plateRent)}
        value={plateRent}
      >
        <Picker.Item label="" value=""/>
        { 
          cars.map(car => <Picker.Item key={car.plateNumber} label={car.plateNumber} value={car.plateNumber}/>)
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
          label="Nro Renta "
          mode="outlined"
          left={<TextInput.Icon icon="account-arrow-down"/>}
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
          label="Fecha Inicial "
          mode="outlined"
          left={<TextInput.Icon icon="calendar-range"/>}
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
          left={<TextInput.Icon icon="calendar-range"/>}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
        )}
        name="finalDate"
        />
        {errors.finalDate && <Text style={{ color: 'red' }}>El Campo obligatorio</Text>}     
      <View style={[{flexDirection: "row", marginTop:20 }]}>
        <Button
          style={{ marginTop: 15, marginEnd: 10 }}
          icon="share"
          mode="contained"
          buttonColor="#0265FE"
          onPress={handleSubmit(onSaveRent)}
        >Guardar</Button>
        <Button
          style={{marginTop:20}}
          textColor="#0265FE"
          onPress={()=>{
          setTimeout(()=>{
            navigation.navigate('Profile')
          },1000)
          setValue('')
          }}
        >Volver</Button>
      </View>
      <Text style={{fontFamily:'Arial',fontSize:15,marginTop:20,color:'red'}}>{errorMessage}</Text>
    </View>
  );
}


