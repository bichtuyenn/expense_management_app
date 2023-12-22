
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: 'Nhật Bản', value: 'JPY' },
  { label: 'Việt Nam', value: 'VND' },
  { label: 'Mỹ', value: 'USD' },
  { label: 'Hàn Quốc', value: 'KRW' },
  { label: 'Trung Quốc', value: 'CNY' }
];

const Activities = () => {
  const [value, setValue] = useState('VND');
  const [value2, setValue2] = useState('USD');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({}); 

  useEffect(() => {
    const apiKey = 'd8f8aa5acc61369e652ccbd43d49e7eb';
    const apiUrl = `https://open.er-api.com/v6/latest/${value}`;

    axios
      .get(apiUrl, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        setExchangeRates(response.data.rates);
      })
      .catch(error => console.error('Error fetching exchange rates:', error));
  }, [value, setExchangeRates]);

  const convertCurrency = () => {
    const exchangeRate = exchangeRates[value2];
    const result = (parseFloat(amount) * exchangeRate).toFixed(2);
    setConvertedAmount(result);
  };

  const handleDropdownFocus = () => {
  };

  const handleDropdownBlur = () => {
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Enter amount:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter amount"
          value={amount}
          onChangeText={text => setAmount(text)}
        />
      </View>
      <Text>Select from currency:</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!value ? 'Select item' : '...'}
        value={value}
        onFocus={handleDropdownFocus}
        onBlur={handleDropdownBlur}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            name="Safety"
            size={20}
          />
        )}
      />
      <Text>Select to currency:</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!value2 ? 'Select item' : '...'}
        value={value2}
        onFocus={handleDropdownFocus}
        onBlur={handleDropdownBlur}
        onChange={item => {
          setValue2(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            name="Safety"
            size={20}
          />
        )}
      />
      <Text style= {styles.trong}></Text>
      <Button title="Convert" onPress={convertCurrency} style={styles.button}/>
      {convertedAmount && (
        <Text style= {styles.trong}>
          {amount} {value} is equal to {convertedAmount} {value2}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16
  },
  header: {
    marginTop: 10
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    
  },
  icon: {
    marginRight: 5
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  },
  button: {
    marginTop: 20
  },
  trong:{
    marginTop: 5
  }
});

export default Activities;
