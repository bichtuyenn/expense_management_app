import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const defaultColors = {
  Food: "#F00",
  Transportation: "#FFF7D4",
  Entertainment: "red",
  Shopping: "#E26EE5",
  Rent: "#508D69",
};

const Chart = ({ expenses }) => {
  const screenWidth = Dimensions.get('window').width;
  const [data, setData] = useState([]);

  const calculateTotalExpenseByCategory = (category) => {
    const existingData = data.find((expense) => expense.name === category);
    const newTotalExpense = expenses.reduce((total, expense) => {
      if (expense.category === category) {
        return total + parseFloat(expense.number || 0);
      }
      return total;
    }, 0);

    if (existingData) {
      existingData.population = newTotalExpense;
    } else {
      setData((prevData) => [
        ...prevData,
        {
          name: category,
          population: newTotalExpense,
          color: defaultColors[category] || "#000000",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
      ]);
    }

    return newTotalExpense;
  };

  useEffect(() => {
    if (expenses && expenses.length > 0) {
      setData((prevData) => {
        const newData = expenses.reduce((acc, expense) => {
          const existingData = acc.find((d) => d.name === expense.category);
          if (existingData) {
            existingData.population = calculateTotalExpenseByCategory(expense.category);
          } else {
            acc.push({
              name: expense.category,
              population: calculateTotalExpenseByCategory(expense.category),
              color: expense.color || defaultColors[expense.category] || "#000000",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            });
          }
          return acc;
        }, [...prevData]);

        return newData;
      });
    }
  }, [expenses]);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"#FFFFFF"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});

export default Chart;