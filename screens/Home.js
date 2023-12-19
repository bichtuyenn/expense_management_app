import {View, Text , StyleSheet, SafeAreaView, FlatList, ScrollView} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-native-chart-kit';
import Chart from './Chart';

const Home = ({ route }) => {
    const [selectedtDate, setSelectedDate] = useState(new Date());
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] =useState([]);

    useEffect(() => {
      setSelectedDate(new Date());
    }, []);
  
    useEffect(() => {
      if (route.params && route.params.income) {
        setIncome(route.params.income);
      }
    }, [route.params]);

    useEffect(() => {
      if (route.params && route.params.expenses) {
        setExpenses(route.params.expenses);
      }
    }, [route.params]);


    const onDateChange = (date, type) => {
      if (type === 'DATE_NOW') {
        return;
      } else {
        setSelectedDate(date);
      }
    };
//Tinh tong tien tung category
    const calculateTotalExpenseByCategory = (category) => {
      let totalExpense = 0;
      expenses.forEach((expense) => {
        if (expense.category === category) {
          const number = parseFloat(expense.number || 0);
          totalExpense += number;
        }
      });
      return totalExpense;
    };
  
    const totalFoodExpense = calculateTotalExpenseByCategory('Food');
    const totalRentExpense = calculateTotalExpenseByCategory('Rent');
    const totalShoppingExpense = calculateTotalExpenseByCategory('Shopping');
    const totalEntertainmentExpense = calculateTotalExpenseByCategory('Entertainment');
    const totalTransportExpense = calculateTotalExpenseByCategory('Transportation');

    const calculateTotalExpense = () => {
      let totalExpense = 0;
      expenses.forEach((expense) => {
        const number = parseFloat(expense.number || 0);
        totalExpense += number;
      });
      return totalExpense;
    };
    
    const calculateTotalIncome = () => {
      let totalIncome = 0;
      income.forEach((income) => {
        const numberIncome = parseFloat(income.numberIncome || 0);
        totalIncome += numberIncome;
      });
      return totalIncome;
    };
    return (
      <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.titleStyle}>EXPENSE MANAGERMENT</Text>
          <View style={styles.horizontalLine} />
          <View style={styles.expenseMangager}>
              <Text>Thu nhập: {calculateTotalIncome()} đ </Text>
              <Text>Chi tiêu: {calculateTotalExpense()} đ</Text>
              <Text>Số dư: {calculateTotalIncome() - calculateTotalExpense()} đ</Text>
          </View>
          
          <View style={styles.horizontalLine} />

          <View style= {styles.expenseDetail}>
            <Text>Chi tiêu: </Text>
            <View style={styles.expenseDetail}>
            {expenses.length > 0 ? (
              <>
                  {expenses.map((expense, index) => (
                    <View key={index}>
                      <Text>- {parseFloat(expense.number || 0)} </Text>
                      <Text>  {expense.day} </Text>
                      <Text>  {expense.category} </Text> 
                      <Text>  {expense.text} </Text>
                    </View>
                  ))}
              </>
            ) : (
              <Text>No expenses</Text>
            )}
          </View>

          <View style= {styles.expenseDetail}>
              <Text>Thu nhập: </Text>
              <View style={styles.expenseDetail}>
                {income.length > 0 ? (
                  <>
                    {income.map((income, index) => (
                      <View key={index}>
                          <Text>+ {parseFloat(income.numberIncome || 0)} </Text>
                          <Text>  {income.day} </Text>
                          <Text>  {income.note} </Text>
                      </View>
                      ))}
                  </>
                ) : (
                  <Text>No income</Text>
                )}
                 <Chart expenses={expenses} />
              </View>
          </View>
       </View>
    </View>
  </SafeAreaView>
</ScrollView>
      
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      padding: 16,
    },
    titleStyle: {
      textAlign: 'center',
      fontSize: 20,
      marginBottom:20,
    },
    horizontalLine:{
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    expenseMangager:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10, 
    },
    expenseDetail: {
      marginTop: 10,
      backgroundColor: '#B2C8BA',

    }
  });

export default Home;
