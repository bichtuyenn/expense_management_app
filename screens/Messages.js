import React,{useState,  useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView , Alert} from 'react-native';
import { useNavigation , useFocusEffect} from '@react-navigation/native';
import { Button } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';

  const Messages = ({ navigation }) => {
      const [isChatSelected, setIsChatSelected] = useState(true);
      const [isNotificationSelected, setIsNotificationSelected] = useState(false);
      const [day, setDay] = React.useState(new Date().toDateString());
      const [number, setNumber] = React.useState('');
      const [text,  setText] = React.useState('');
      const [expenses, setExpenses] =useState([]);
      const [selectedCategory, setSelectedCategory] = useState('Food');
      const [categoryIndex, setCategoryIndex] = useState(0);
      const predefinedCategories = ['Food', 'Rent', 'Shopping', 'Entertainment', 'Transportation'];
      const [selectedDate, setSelectedDate] = useState(new Date());


      const initialCategoryValues = {
        'Food': 0,
        'Rent': 0,
        'Shopping': 0,
        'Entertainment': 0,
        'Transportation': 0,
      };
      
      useEffect(() => {
        setSelectedDate(new Date());
      }, []);
      const onDateChange = (date, type) => {
        if (type === 'DATE_NOW') {
          return;
        } else {
          const selectedDate = date.toDate();
          setSelectedDate(selectedDate);
          setDay(selectedDate.toDateString());
        }
      };
      
      const handleCategoryPress = (category) => {
        setSelectedCategory(category);
      };
      const renderItem = ({ item }) => (
        <TouchableOpacity
          style={[styles.categoryItem, item === selectedCategory ? styles.selectedCategoryItem : {}]}
          onPress={() => handleCategoryPress(item)}
        >
          <Text style={styles.categoryText}>{item}</Text>
        </TouchableOpacity>
      );
      
      const handleSubmit = () => {
        if ((number.trim() === '')) {
            Alert.alert('Please type your expense!');
            return;
        }
        const newExpense = { number, text, day, category: selectedCategory }; 
        setExpenses([...expenses, newExpense]); 
        setNumber('0');
        setText('');
        navigation.navigate('Home', { expenses: [...expenses, newExpense] });
      }
    
      const nav = useNavigation();
      useFocusEffect(() => {
        setIsChatSelected(true);
        setIsNotificationSelected(false);
      });

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
              navigation.navigate('Notification');
            }}
          >
            <Text style={[styles.buttonText, isNotificationSelected ? styles.selectedText : {}]}>Thu nhập</Text>
          </TouchableOpacity>
        </View>
        {isChatSelected ? (
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
                    selected={selectedDate}
                    // onDateChange={(date) => setSelectedDate(date)}
                    onDateChange={onDateChange}
                  />
          </View>
            <View style = {styles.expense}>
                <Text style={styles.text}>Tiền chi</Text>
                <TextInput
                    placeholder='000'
                    value={number}
                    style={styles.input}
                    onChangeText={(number) => setNumber(number)}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.expense}>
                <Text style={styles.text}>Ngày</Text>
                <View>
                    <Text style={[styles.dateTimeNow, styles.input]}>{day}</Text>
                </View>
            </View>
            <View style={styles.expense}>
                <Text style={styles.text}>Ghi chú</Text>
                <TextInput
                      placeholder='Typing note'
                      value={text}
                      onChangeText={(text) => setText(text)}
                      style= {styles.input}
                />
            </View>
            <View>
                <Text>Danh mục</Text>
            </View>
            <View style={styles.categoryContainer}>
                  <FlatList
                      data={predefinedCategories}
                      renderItem={renderItem}
                      keyExtractor={(item) => item}
                      horizontal
                      style={styles.flatList}
                      initialScrollIndex={categoryIndex}
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
              onPress={handleSubmit}
              >Nhập khoản chi
          </Button>
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
        alignContent: 'center',
        alignItems: 'center',
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
  
  export default Messages;
