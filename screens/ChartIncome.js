import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const defaultColors = {
  Salary: "#F00",
  Allowance: "#FFF7D4",
  Bonus: "red",
  "Investment money": "#E26EE5",
};

const ChartIncome = ({ data }) => {
  const screenWidth = Dimensions.get('window').width;

  if (!data || data.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Placeholder chart when there is no data */}
        <PieChart
          data={[]}
          width={screenWidth}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
        />
      </SafeAreaView>
    );
  }

  const calculateTotalIncomeByCategory = (category) => {
    return data.reduce((total, item) => {
      if (item.category === category) {
        return total + parseFloat(item.numberIncome || 0);
      }
      return total;
    }, 0);
  };

  const incomeData = data.map((item) => ({
    name: item.category,
    population: calculateTotalIncomeByCategory(item.category),
    color: item.color || defaultColors[item.category] || "#000000",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

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
      <PieChart
        data={incomeData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
      />
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

export default ChartIncome;

