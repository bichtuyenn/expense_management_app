import React,{useState,  useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList,Alert, ScrollView } from 'react-native';
import { useNavigation , useFocusEffect} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';


const Notification = ({ navigation }) => {
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [isNotificationSelected, setIsNotificationSelected] = useState(true);
  const [day, setDay] = React.useState(new Date().toDateString());
  const [numberIncome, setNumberIncome] = React.useState('');
  const [note,  setNote] = React.useState('');
  const [income, setIncome] =useState([]);
  const [incomeCategory, setIncomeCategory] = useState('Salary');
  const [incomeCategoryIndex, setIncomeCategoryIndex] = useState(0);
  const predefinedIncomeCategories = ['Salary', 'Allowance', 'Bonus', 'Investment money'];
  const [selectedIncomeDate, setSelectedIncomeDate] = useState(new Date());

  const handleSubmitIncome = () => {
    if ((numberIncome.trim() === '')){
      Alert.alert('Please type your income!');
      return;
    }
    const newIncome = { numberIncome, note, day, incomeCategory};
    setIncome([...income, newIncome]);
    setNumberIncome('');
    setNote('');
    navigation.navigate('Home', {income: [...income, newIncome]});
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
    const selectedIncomeDate = date.toDate();
    setSelectedIncomeDate(selectedIncomeDate);
    setDay(selectedIncomeDate.toDateString());
  }
};

const handleCategoryPress = (category) => {
  setIncomeCategory(category);
};
const renderItem = ({ item }) => (
  <TouchableOpacity
    style={[styles.categoryItem, item === incomeCategory ? styles.incomeCategoryItem : {}]}
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
          <Text style={[styles.buttonText, isChatSelected ? styles.selectedText : {}]}>Chi tiêu</Text>
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
          <Text style={[styles.buttonText, isNotificationSelected ? styles.selectedText : {}]}>Thu nhập</Text>
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
                    // onDateChange={(date) => setSelectedDate(date)}
                    onDateChange={onDateChange}
                  />
        </View>
        <View style = {styles.expense}>
            <Feather
                name="card-outline"
                color="grey"
                size={20}
            />
            <TextInput
                placeholder='0'
                value={numberIncome}
                style={styles.input}
                onChangeText={(numberIncome) => setNumberIncome(numberIncome)}
                keyboardType='numeric'
            />
            <Text>đ</Text>
        </View>
        <View style={styles.expense}>
            <Feather
                name="today-outline"
                color="grey"
                size={20}
            />
                        <Feather
                name="chevron-back-outline"
                color="grey"
                size={20}
            />
            <Text style= {styles.dateTimeNow & styles.input} >{day}</Text>
            <Feather
                name="chevron-forward-outline"
                color="grey"
                size={20}
            />
        </View>
        <View style={styles.expense}>
            <Text style={styles.text}>Ghi chú</Text>
            <TextInput
                  placeholder='Typing note'
                  value={note}
                  onChangeText={(note) => setNote(note)}
                  style= {styles.input}
            />
        </View>
        <View>
                <Text>Danh mục</Text>
        </View>
        <View style={styles.categoryContainer}>
            <FlatList
                  data={predefinedIncomeCategories}
                  renderItem={renderItem}
                  keyExtractor={(item) => item}
                  horizontal
                  style={styles.flatList}
                  initialScrollIndex={incomeCategoryIndex}
                  getItemLayout={(data, index) => (
                  { length: 100, offset: 100 * index, index }
                  )}
            />
        </View>
    </View>
    ) : null}
      <Button 
          labelStyle={{ color: '#ffffff' }}
          style= {styles.buttonAdd}
          onPress={handleSubmitIncome} 
          >Nhập thu nhập</Button>
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
    backgroundColor: '#007ACC',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
  },
  selectedText: {
    color: 'white',
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
      backgroundColor:"#B4B4B3"
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
  },
  addContainer: {
      padding: 10,
      borderRadius: 10,
      marginLeft: 20,
      marginRight: 20,
      backgroundColor: '#ffffff'
  },
  expense: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
  },
  text:{
    marginRight: 10,
  },
  input:{
    textAlign: 'center'
  },
  buttonAdd:{
    backgroundColor: '#00A9FF',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 2,
    borderRadius: 15,
  },
  flatListContainer: {
    marginTop: 10, // Khoảng cách giữa FlatList và phần trên nó
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
    fontSize: 16,
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


});

export default Notification;