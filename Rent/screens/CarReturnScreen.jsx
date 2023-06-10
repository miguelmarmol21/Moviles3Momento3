import { Text, View, Picker } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from 'react-hook-form';
import { styles } from "../assets/styles/styles";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function ProfileScreen({navigation}){
    const [errorMessage, setErrorMessage] = useState('')
    const [rents, setRents] = useState([]);
    const [rentNumber, setRentNumber] = useState('');
    const [cars, setCars] = useState([]);

    const URL = 'http://127.0.0.1:3600'

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            plateRent:'',
            returnDate: '',
        }
      });

  useEffect(()=>{
    getRents()
    getCars()
  },[])

    const getRents = async () =>{
      const response = await axios.get(`${URL}/rents`);
      setRents(response.data)
    }

    const getCars = async () =>{
      const response = await axios.get(`${URL}/cars/return`);
      setCars(response.data)
    }

    const onSaveCarReturn = (data) =>{
      const { returnDate } = data
      let findPlate = rents.find(rent => rent.rentNumber == rentNumber)
      setValue('plateRent',findPlate.plateRent)
      setTimeout(async ()=>{ 
        const response = await axios.put(`${URL}/rents/${findPlate._id}`,{
          statusRent:false,
          returnDate
        })
        if(response){
            onUpdateCarStatus()
        }else{
          setErrorMessage('La devolucion no ha sido procesada correctamente ...') 
        }
      },3500)
    }

    const onUpdateCarStatus = async () =>{
      let findPlate = rents.find(rent => rent.rentNumber == rentNumber)
      let findCar = cars.find(car => car.plateNumber == findPlate.plateRent);
      const response = await axios.put(`${URL}/cars/${findCar._id}`,{
        statusCar:true
      })
      if(response){
        setErrorMessage('La devolucion ha sido procesada correctamente ...')  
      }else{
        setErrorMessage('Ocurrio un error intenta de nuevo ...')
      }
    }
    
    return (
    <View style = {styles.container}>
        <Text style={{fontFamily:'Arial',fontSize:30,marginTop:10}}>Estamos en Devolucion</Text>
        <Picker
        style={styles.picker}
        onValueChange={rentNumber => setRentNumber(rentNumber)}
        value={rentNumber}
      >
        <Picker.Item label=""/>
        { 
          rents.map(rent => <Picker.Item key={rent.rentNumber} label={rent.rentNumber} value={rent.rentNumber}/>)
        }
      </Picker>
      <Controller
        control={control}
        rules={{
        required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={styles.texinput}
          activeOutlineColor="#0265FE"
          outlineColor="#919191"
          label="Nro Placa"
          mode="outlined"
          left={<TextInput.Icon icon="account-arrow-down"/>}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          editable={false}
        />
        )}
        name="plateRent"
        />
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
          left={<TextInput.Icon icon="calendar-range"/>}
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
          onPress={handleSubmit(onSaveCarReturn)}
        >Devolver</Button>
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
        <Text style={{fontFamily:'Arial',fontSize:15,marginTop:20,color:'red'}}>{errorMessage}</Text>
    </View>
    );
}