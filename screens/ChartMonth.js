import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, View, Text , ScrollView, TouchableOpacity, Alert} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import Chart from './Chart';
import ChartIncome from './ChartIncome';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const defaultColors = {
  Food: "#F00",
  Transport: "#FFF7D4",
  Entertainment: "red",
  Shopping: "#E26EE5",
  Rent: "#508D69",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FCE9F1'
  },
  chartContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    width: '100%',
    backgroundColor: '#FCE9F1'
  },
  chartSpacing: {
    // marginBottom: 200, 
    backgroundColor: '#F2AFEF'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  header: {
    backgroundColor: '#F2AFEF',
    position: 'relative',
    height: 100,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  body: {
      marginTop: -30,
      backgroundColor: '#ffffff',
      borderRadius: 20,
      marginLeft: 20,
      marginRight: 20,
      flex: 1, // Add this line 
  },
  button: {
    padding: 12,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonContainer:{
    marginTop: 30,
    marginLeft: 60,
    marginRight: 60,
    marginBottom: 40,
  },
  buttons: {
    borderRadius: 20,
  },
  body1: {
    borderRadius: 20,
  }
});

const ChartMonth = () => {
  const navigation = useNavigation();
  const { updateData, id, updateDataExpenses, setUpdateDataExpenses, updateDataIncome, setUpdateDataIncome, isPremium } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  useEffect(() => {
    axios.get(`http://134.209.108.2:3002/api/getExpensesByCurrentMonth/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => setExpenses(response.data))
    .catch(error => console.log(error));


    axios.get(`http://134.209.108.2:3002/api/getIncomesByCurrentMonth/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => setIncomes(response.data))
    .catch(error => console.log(error));
  }, [updateData]);

  const viewChartYearHandle = () => {
    if (isPremium === true){
      navigation.navigate('ChartYear');
    }
    else{
      Alert.alert('Please buy premium');
    }
  }
  return (
 <ScrollView>
<SafeAreaView style={styles.container}>
    <View style = {styles.header}>
    </View>
    <View style = {styles.body}>
      <View style = {styles.body1}>
          <Text style = {{fontSize: 20,fontWeight: 'bold',textAlign: 'center',color: '#000000', marginTop: 20}}
          >Expenses Chart 
          </Text>
          <View style={[styles.chartContainer, styles.chartSpacing]}>
              <Chart expenses={expenses} />
          </View>
      </View>
      <View  style = {styles.body1}>
          <Text style = {{backgroundColor : '#FCE9F1'}}></Text>
          <Text style = {{fontSize: 20,fontWeight: 'bold',textAlign: 'center',color: '#000000', marginTop:20}}>Income Chart</Text>
          <View style={styles.chartContainer}>
              <ChartIncome incomes={incomes} />
          </View>
      </View>
    </View>
    <View style = {styles.buttonContainer}>
        <TouchableOpacity
          style={{borderRadius: 20}}
          onPress={viewChartYearHandle}
        >
        <LinearGradient
          colors={['#F875AA', '#BEADFA']}
          style={{borderRadius: 20}}
        >
        <Text style={[styles.button, {color:'#fff', fontSize:18, fontWeight: 'bold'}]}
        >View yearly chart
        </Text>
        </LinearGradient>
        </TouchableOpacity>
    </View>
</SafeAreaView>
</ScrollView>
  );
};

export default ChartMonth;




