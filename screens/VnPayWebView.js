import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';

const VnPayWebView = ({ navigation }) => {
  const paymentUrl = 'YOUR_VNPAY_PAYMENT_URL'; // Thay thế bằng URL thanh toán VNPAY của bạn

  // Hàm xử lý sự kiện điều hướng trong WebView
  const handleNavigation = (event) => {
    const { url } = event;

    // Kiểm tra xem URL có chứa chỉ báo thành công hoặc lỗi không
    if (url.includes('payment-success')) {
      // Xử lý thành công, ví dụ: điều hướng đến màn hình thành công
      navigation.navigate('PaymentSuccess');
    } else if (url.includes('payment-error')) {
      // Xử lý lỗi, ví dụ: điều hướng đến màn hình lỗi
      navigation.navigate('PaymentError');
    }
  };

  useEffect(() => {
    return () => {
      // Dọn dẹp thêm nếu cần
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