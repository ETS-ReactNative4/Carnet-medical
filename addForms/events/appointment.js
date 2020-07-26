import React, { useState } from 'react';
import { Text, View, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import { GlobalStyle } from '../../styles/GlobalStyle';
import { TextInput } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {auth,db} from '../../database/firebase'


export default function appointment() {
  const[showDatePicker,setShowDate] = useState(false)
  const[date,setDate]=useState('')
  const[time,setTime]=useState('')
  const[doc,setDoc]=useState('')
  const[price,setPrice]=useState('')
  const[specialisation,setSpecialisation]=useState('')

  const toggleDatePicker =()=>{
    setShowDate(!showDatePicker)
  }
  const handleConfirm = (date) => {
    var d = new Date(date)
    setDate(d.toDateString())
    setTime(d.toLocaleTimeString())
    toggleDatePicker()
  }

  const saveEvent =()=>{
    db.ref('user/'+auth.currentUser.uid+'/appointments').push({
      doctor:doc,
      specialisation:specialisation,
      cost:price,
      date:date,
      time:time
    })
  } 
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss()}>
        <View style={GlobalStyle.formContainer}>
          <DateTimePickerModal 
          isVisible={showDatePicker}
          mode='datetime'
          onCancel={toggleDatePicker}
          onConfirm={handleConfirm}
          is24Hour
          />
          <Text style={GlobalStyle.formTitle}> Doctor's appointment </Text>
          <View style={GlobalStyle.formDateContainer}>
            <TouchableOpacity style={GlobalStyle.preference2}
            onPress={()=>toggleDatePicker()}
              >
              <Fontisto
                name="date"
                size={30}
                style={{ marginBottom: 10 }}
                color='#A8D28F'
              />
            </TouchableOpacity>
            <TextInput
            disabled
              label='01/01/1996'
              mode='outlined'
              theme={{ colors: { primary: '#A8D28F', background: '#fff', width: 100 } }}
              value={date}
            />
            <TouchableOpacity style={GlobalStyle.preference2}>
              <Fontisto
                name="clock"
                size={30}
                style={{ marginBottom: 10, marginTop: 10 }}
                color='#A8D28F'
              />
            </TouchableOpacity>
            <TextInput
              disabled
              value={time}
              label='22:22'
              mode='outlined'
              theme={{ colors: { primary: '#A8D28F', background: '#fff' } }}
            />
          </View>

          <View style={{ alignContent: 'center', margin: 10 }}>

            <Text style={GlobalStyle.formSubTitle}>information </Text>
            <TextInput
              label='Doctor'
              mode='outlined'
              theme={{ colors: { primary: '#A8D28F', background: '#fff' } }}
              style={{ marginTop: 10 }}
            
              onChangeText={doc=>setDoc(doc)}
            />
            <TextInput
              label='Specialization'
              mode='outlined'
              theme={{ colors: { primary: '#A8D28F', background: '#fff' } }}
              style={{ marginTop: 10 }}
              onChangeText={text=>setSpecialisation(text)}
            />

            <TextInput
              label='Cost'
              mode='outlined'
              placeholder="MAD"
              theme={{ colors: { primary: '#A8D28F', background: '#fff' } }}
              style={{ marginTop: 10 }}
              keyboardType='numeric'
              onChangeText={(text)=>setPrice(text)}
            />
        <TouchableOpacity
        onPress={saveEvent}
          >
        <Text style={GlobalStyle.buttonSignIn}>Save</Text>
        </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}