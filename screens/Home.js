import {View, Text , StyleSheet, SafeAreaView, FlatList, ScrollView} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-native-chart-kit';
import Chart from './Chart';
import ChartIncome from './ChartIncome';



const Home = ({ route }) => {
    const [selectedtDate, setSelectedDate] = useState(new Date());
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] =useState([]);

    useEffect(() => {
      setSelectedDate(new Date());
    }, []);
  
// income
const calculateTotalIncomeByCategory = (category) => {
  let totalIncome = 0;
  income.forEach((income) => {
    if (income.incomeCategory === category) {
      const number = parseFloat(income.numberIncome || 0);
      totalIncome += number;
    }
  });
  return totalIncome;
};

const totalSalary = calculateTotalIncomeByCategory('Salary');
const totalBonus = calculateTotalIncomeByCategory('Bonus');
const totalAllowance = calculateTotalIncomeByCategory('Allowance');
const totalInvestment = calculateTotalIncomeByCategory('Investment money');

 const calculateTotalIncome = () => {
      let totalIncome = 0;
      income.forEach((income) => {
        const numberIncome = parseFloat(income.numberIncome || 0);
        totalIncome += numberIncome;
      });
      return totalIncome;
 };

  useEffect(() => {
      if (route.params && route.params.income) {
        setIncome(route.params.income);
      }
    }, [route.params]);

//Tinh tong tien tung expense
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
    const totalTransportExpense = calculateTotalExpenseByCategory('Transport');

    const calculateTotalExpense = () => {
      let totalExpense = 0;
      expenses.forEach((expense) => {
        const number = parseFloat(expense.number || 0);
        totalExpense += number;
      });
      return totalExpense;
    };

    useEffect(() => {
      if (route.params && route.params.expenses) {
        setExpenses(route.params.expenses);
      }
    }, [route.params]);

    return (
<ScrollView>
<SafeAreaView style={styles.container}>
  <View style={styles.container}>
    <Text style={styles.titleStyle}>EXPENSE MANAGEMENT</Text>
    <View style={styles.horizontalLine} />

    <View style={styles.rowContainer}>
      <Text style={styles.label}>Thu nhập:</Text>
      <Text style={styles.value}>{calculateTotalIncome()} đ</Text>
    </View>

    <View style={styles.rowContainer}>
      <Text style={styles.label}>Chi tiêu:</Text>
      <Text style={styles.value}>{calculateTotalExpense()} đ</Text>
    </View>

    <View style={styles.rowContainer}>
      <Text style={styles.label}>Số dư:</Text>
      <Text style={styles.value}>
        {calculateTotalIncome() - calculateTotalExpense()} đ
      </Text>
    </View>

    <View style={styles.horizontalLine} />

    <View style={styles.expenseDetail}>
      <Text style={styles.expenseHeader}>Chi tiêu</Text>
      {expenses.length > 0 ? (
        <>
          {expenses.map((expense, index) => (
            <View key={index} style={styles.expenseRow}>
              <Text style={styles.expenseCategory}>
                {expense.category}
              </Text>
              <View style={styles.expenseDetails}>
                <Text>{expense.day}</Text>
                <Text>{parseFloat(expense.number || 0)}</Text>
                <Text>{expense.text}</Text>
              </View>
              {index < expenses.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </>
      ) : (
        <Text>No expenses</Text>
      )}
    </View>

    <View style={styles.expenseDetail}>
      <Text style={styles.expenseHeader}>Thu nhập</Text>
      {income.length > 0 ? (
        <>
          {income.map((income, index) => (
            <View key={index} style={styles.expenseRow}>
              <Text style={styles.expenseCategory}>{income.note}</Text>
              <View style={styles.expenseDetails}>
                <Text>{income.day}</Text>
                <Text>{parseFloat(income.numberIncome || 0)}</Text>
              </View>
              {index < income.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </>
      ) : (
        <Text>No income</Text>
      )}
    </View>

    <View style={styles.chartContainer}>
        <Chart expenses={expenses} />
        <ChartIncome income={income} />
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
marginBottom: 20,
},
horizontalLine: {
height: 1,
backgroundColor: '#ccc',
marginVertical: 10,
},
rowContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
marginTop: 10,
},
label: {
fontWeight: 'bold',
},
value: {
color: 'green',
},
expenseDetail: {
marginTop: 10,
backgroundColor: '#B2C8BA',
padding: 10,
},
expenseHeader: {
fontWeight: 'bold',
fontSize: 16,
marginBottom: 5,
},
expenseRow: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 5,
},
expenseCategory: {
flex: 1,
marginRight: 5,
},
expenseDetails: {
flex: 1,
flexDirection: 'column',
marginLeft: 5,
},
divider: {
height: 1,
backgroundColor: '#ccc',
marginVertical: 5,
},
chartContainer: {
marginTop: 10,
backgroundColor: 'white',
borderRadius: 10,
width: '100%',
alignSelf: 'center',
    }
});
export default Home;
