import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import Chart from './Chart';
import ChartIncome from './ChartIncome';

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
    backgroundColor: '#F5F5F5',
  },
  chartContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
    padding: 10,
  },
  chartSpacing: {
    marginBottom: 200, 
  },
});

const Activities = () => {
  const { updateData, id, updateDataExpenses, setUpdateDataExpenses, updateDataIncome, setUpdateDataIncome } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  useEffect(() => {
    axios.get(`http://134.209.108.2:3002/api/getExpenses/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => setExpenses(response.data))
    .catch(error => console.log(error));
    
    axios.get(`http://134.209.108.2:3002/api/getIncomes/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => setIncomes(response.data))
    .catch(error => console.log(error));
  }, [updateData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.chartContainer, styles.chartSpacing]}>
        <Chart expenses={expenses} />
        <Text>Biểu đồ chi tiêu</Text>
      </View>
      <View style={styles.chartContainer}>
        <ChartIncome incomes={incomes} />
        <Text>Biểu đồ thu nhập</Text>
      </View>
    </SafeAreaView>
  );
};

export default Activities;
