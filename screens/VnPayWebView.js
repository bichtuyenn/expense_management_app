import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';

// Hàm trả về một số nguyên ngẫu nhiên trong khoảng từ min đến max (bao gồm cả min và max)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hàm tạo số nguyên ngẫu nhiên có độ dài n ký tự
function generateRandomNumberWithLength(length) {
  let randomNumber = '';
  for (let i = 0; i < length; i++) {
    const digit = getRandomInt(0, 9);
    randomNumber += digit;
  }
  return randomNumber;
}

const VnPayWebView = ({ navigation }) => {
  const randomOrderId = generateRandomNumberWithLength(10);
  const paymentUrl = `http://134.209.108.2:8888/order/create_payment_url?amount=10000&orderId=${randomOrderId}`;

  const handleNavigation = (event) => {
    const { url } = event;
    if (url.includes('success=ok')) {
      // navigation.navigate('PaymentSuccess');
      console.log('success')
    } else if (url.includes('success=error')) {
      console.log('error')
    }
  };

  useEffect(() => {
    return () => {
      // Hàm cleanup nếu cần
    };
  }, []);

  return (
    <WebView
      source={{ uri: paymentUrl }}
      onNavigationStateChange={handleNavigation}
    />
  );
};

export default VnPayWebView;