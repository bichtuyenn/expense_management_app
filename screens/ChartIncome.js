// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, StyleSheet, View } from 'react-native';
// import { PieChart } from 'react-native-chart-kit';
// import { Dimensions } from 'react-native';

// const defaultColors = {
//   Salary: "#7D0A0A",
//   Bonus: "#52D3D8",
//   Allowance: "red",
//   'Investment money': "#E26EE5",
// };

// const ChartIncome = ({ income }) => {
//   const screenWidth = Dimensions.get('window').width;
//   const [data, setData] = useState([]);

  
//   useEffect(() => {
//     if (income && income.length > 0) {
//       setData((prevData) => {
//         const newData = income.reduce((acc, item) => {
//           const existingData = acc.find((d) => d.name === item.incomeCategory);
//           if (existingData) {
//             population = calculateTotalIncomeByCategory(item.incomeCategory);
//           } else {
//             acc.push({
//               name: item.incomeCategory,
//               population: calculateTotalIncomeByCategory(item.incomeCategory),
//               color: item.color || defaultColors[item.incomeCategory] || "#000000",
//               legendFontColor: "#7F7F7F",
//               legendFontSize: 15,
//             });
//           }
//           return acc;
//         }, [...prevData]);

//         return newData;
//       });
//     }
//   }, [income]);

  

//   const calculateTotalIncomeByCategory = (category) => {
//     const existingData = data.find((item) => item.name === category);
//     const newTotalIncome = income.reduce((total, item) => {
//       if (item.incomeCategory === category) {
//         return total + parseFloat(item.numberIncome || 0);
//       }
//       return total;
//     }, 0);

//     if (existingData) {
//       existingData.population = newTotalIncome;
//     } else {
//       setData((prevData) => [
//         ...prevData,
//         {
//           name: category,
//           population: newTotalIncome,
//           color: defaultColors[category] || "#000000",
//           legendFontColor: "#7F7F7F",
//           legendFontSize: 15,
//         },
//       ]);
//     }

//     return newTotalIncome;
//   };

//   const chartConfig = {
//     backgroundGradientFrom: '#1E2923',
//     backgroundGradientFromOpacity: 0,
//     backgroundGradientTo: '#08130D',
//     backgroundGradientToOpacity: 0.5,
//     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//     strokeWidth: 2,
//     barPercentage: 0.5,
//     useShadowColorFromDataset: false,
//   };

//   if (!income || income.length === 0) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View>
//           <PieChart
//             data={[]}
//             width={screenWidth}
//             height={220}
//             chartConfig={{
//               color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//             }}
//             accessor={"population"}
//             backgroundColor={"transparent"}
//           />
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <PieChart
//           data={data}
//           width={screenWidth}
//           height={220}
//           chartConfig={chartConfig}
//           accessor={"population"}
//           backgroundColor={"transparent"}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//   },
// });

// export default ChartIncome;

