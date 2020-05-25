import React from 'react';
import {View} from 'react-native';

import AddTest from '../add/addTests';
import {GlobalStyle} from '../styles/GlobalStyle'
import { ScrollView } from 'react-native-gesture-handler';



export default function Tests({navigation}) {
  
  return (
    <View style={GlobalStyle.container}>
    <AddTest />
    </View>
  );
}