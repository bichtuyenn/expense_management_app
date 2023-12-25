import React,{useState,  useEffect, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList,Alert, ScrollView } from 'react-native';
import { useNavigation , useFocusEffect} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { format } from 'date-fns';
import axios from 'axios';
import { AuthContext } from './AuthContext';
const data = [
  { label: 'Salary', value: '0' },
  { label: 'Allowance', value: '0' },
  { label: 'Bonus', value: '0'},
  { label: 'Investment money', value: '0' },
];
const Notification = ({ navigation }) => {
  const {id, updateData, setUpdateData} = useContext(AuthContext);
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [isNotificationSelected, setIsNotificationSelected] = useState(true);
  const [day, setDay] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [numberIncome, setNumberIncome] = React.useState('');
  const [note,  setNote] = React.useState('');
  const [income, setIncome] =useState([]);
  const [incomeCategory, setIncomeCategory] = useState(data[0].label);
  const [selectedIncomeDate, setSelectedIncomeDate] = useState(new Date());

  const handleSubmitIncome = () => {
    if ((numberIncome.trim() === '')){
      Alert.alert('Please type your income!');
      return;
    }
    const newIncome = { numberIncome, note, day, incomeCategory };
    setIncome([...income, newIncome]);
    setNumberIncome('');
    setNote('');

    const objectIncome = {
      "categoriesIncome": incomeCategory ,
      "date": day ,
      "value": numberIncome,
      "userId": id,
      "note": note
     }
     axios.post(`http://134.209.108.2:3002/api/addIncome`, objectIncome, {
    headers: {
      'Content-Type': 'application/json',
    },}
)
    .then(response => {
    console.log("true")
    setUpdateData(!updateData);
    navigation.navigate('Home')
    })
    .catch(error => {
      console.log(error);
    });
  }

  const nav = useNavigation();
    useFocusEffect(() => {
      setIsChatSelected(false);
      setIsNotificationSelected(true);
  });

useEffect(() => {
  setSelectedIncomeDate(new Date());
}, []);

const onDateChange = (date, type) => {
  if (type === 'DATE_NOW') {
    return;
  } else {
    const selectedDate = date.toDate();
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1; 
    const year = selectedDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedIncomeDate(selectedIncomeDate);
    setDay(formattedDate);
  }
};

const handleDropdownFocus = () => {
};

const handleDropdownBlur = () => {
};
const handleCategoryPress = (category) => {
  setIncomeCategory(category);
};
const renderItem = ({ item }) => (
  <TouchableOpacity
    style={[styles.categoryItem, item === incomeCategory ? styles.selectedCategoryItem : {}]}
    onPress={() => handleCategoryPress(item)}
  >
    <Text style={styles.categoryText}>{item}</Text>
  </TouchableOpacity>
);
  return (
  <ScrollView>
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            isChatSelected ? styles.selectedButton : {},
          ]}
          onPress={() => {
            setIsChatSelected(true);
            setIsNotificationSelected(false);
            navigation.navigate('Messages');
          }}
        >
          <Text style={[styles.buttonText, isChatSelected ? styles.selectedText : {}]}>Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            isNotificationSelected ? styles.selectedButton : {},
          ]}
          onPress={() => {
            setIsChatSelected(false);
            setIsNotificationSelected(true);
          }}
        >
          <Text style={[styles.buttonText, isNotificationSelected ? styles.selectedText : {}]}>Income</Text>
        </TouchableOpacity>
      </View>
      
      {!isChatSelected ? (
        <View style= {styles.addContainer} >
            <View>
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={false}
                    minDate={new Date(2018, 1, 1)}
                    maxDate={new Date(2050, 6, 3)}
                    weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
                    months={[
                      'January',
                      'Febraury',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ]}
                    previousTitle="Previous"
                    nextTitle="Next"
                    todayBackgroundColor="#e6ffe6"
                    selectedDayColor="#66ff33"
                    selectedDayTextColor="#000000"
                    scaleFactor={375}
                    textStyle={{
                      color: '#000000',
                    }}
                    selected={selectedIncomeDate}
                    onDateChange={onDateChange}
                  />
        </View>
        <View style={styles.horizontalLine} />
        <View style = {styles.expense}>
            <Text style={styles.text}>Expense money</Text>
            <TextInput
                placeholder='0'
                value={numberIncome}
                style={styles.input}
                onChangeText={(numberIncome) => setNumberIncome(numberIncome)}
                keyboardType='numeric'
            />
        </View>
        <View style={styles.expense}>
            <Text style={styles.text}>Date</Text>
            <View>
                <Text style={[styles.dateTimeNow, styles.input]}>{day}</Text>
            </View>
        </View>
        <View style={styles.expense}>
            <Text style={styles.text}>Note</Text>
            <TextInput
                  placeholder='Typing note'
                  value={note}
                  onChangeText={(note) => setNote(note)}
                  style= {styles.input}
            />
        </View>
        <View style={styles.categoryContainer}>
                <Text style= {{fontSize : 18, marginRight: 8}}>Category</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder={incomeCategory}
                  label={incomeCategory}
                  onFocus={handleDropdownFocus}
                  onBlur={handleDropdownBlur}
                  onChange={(item) => {
                    setIncomeCategory(item.label);
                  }}
                />
        </View>
    </View>
    ) : null}
      <Button 
          labelStyle={{ color: '#ffffff', fontSize: 19, textAlign: 'center'}}
          style= {styles.buttonAdd}
          onPress={handleSubmitIncome} 
          >Enter your income</Button>
  </View>
</ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginTop: 20,
  },
  selectedButton: {
    backgroundColor: '#88AB8E',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
  },
  selectedText: {
    color: 'white',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 16,

  },
  addContainer: {
      flex:1,
      backgroundColor:"#B4B4B3",
  },
  icon:{
      borderRadius: 20,
      backgroundColor: '#F3B664',
      padding: 5
  },
  dateTimeNow:{
      padding: 7,
      backgroundColor: '#B4B4B3',
      borderRadius: 10,
      fontSize: 17
  },
  addContainer: {
      padding: 10,
      borderRadius: 10,
      marginLeft: 5,
      marginRight: 5,
      backgroundColor: '#ffffff'
  },
  expense: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  text:{
    marginRight: 10,
    fontSize: 17
  },
  input:{
    textAlign: 'center',
    fontSize: 17
  },
  buttonAdd:{
    backgroundColor: '#88AB8E',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 2,
    borderRadius: 15,
    fontSize: 17
  },
  flatListContainer: {
    marginTop: 10, 
  },

  categoryItem: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  selectedCategoryItem: {
    backgroundColor: '#007ACC',
  },

  categoryText: {
    fontSize: 17,
  },
  flatList: {
    marginTop: 10,
  },

  toggleCategoriesButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  flatList: {
    marginTop: 10,
  },

  toggleCategoriesButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },

  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  arrowButton: {
    padding: 10,
  },
  dropdown: {
    width: 150,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

});


export default Notification;