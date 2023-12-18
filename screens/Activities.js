
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
//import PieChart from './PieChart';

const defaultColors = {
  Food: "#FFF7D4",
  Transportation: "#F00",
  Entertainment: "red",
  Shopping: "#E26EE5",
  Rent: "#508D69",
};

const Activities = ({ expenses }) => {
  const screenWidth = Dimensions.get('window').width;

  if (!expenses || expenses.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <PieChart
            data={[]}
            width={screenWidth}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
          />
        </View>
      </SafeAreaView>
    );
  }

  const calculateTotalExpenseByCategory = (category) => {
    return expenses.reduce((total, expense) => {
      if (expense.category === category) {
        return total + parseFloat(expense.number || 0);
      }
      return total;
    }, 0);
  };

  const data = expenses.map((expense) => ({
    name: expense.category,
    population: calculateTotalExpenseByCategory(expense.category),
    color: expense.color || defaultColors[expense.category] || "#000000",
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
      <View>
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
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

export default Activities;

// import React from 'react';
// import { SafeAreaView, StyleSheet, View } from 'react-native';
// import { Dimensions } from 'react-native';
// import Chart from './Chart';

// const Activities = ({ expenses }) => {

//   return(
//     <View>
//         <Chart expenses={expenses} /> 
//     </View> 
//   )
// }
// export default Activities;