// import React from 'react';
// import { 
//     View, 
//     Text, 
//     TouchableOpacity, 
//     Dimensions,
//     StyleSheet,
//     StatusBar,
//     Image
// } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import { LinearGradient } from "expo-linear-gradient";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useTheme } from '@react-navigation/native';

// const Welcome = ({navigation}) => {
//     const { colors } = useTheme();

//     return (
//       <View style={styles.container}>
//           <StatusBar backgroundColor='#79AC78' barStyle="light-content"/>
//         <View style={styles.header}>
//             <Animatable.Image 
//             animation="bounceIn"
//             duraton="1500"
//             source={require('../assets/logo.png')}
//             style={styles.logo}
//             resizeMode="stretch"
//             />
//         </View>
//         <Animatable.View 
//             style={[styles.footer, {
//                 backgroundColor: colors.background
//             }]}
//             animation="fadeInUpBig"
//         >
//             <Text style={[styles.title, {
//                 color: colors.text
//             }]}>Expense management easily!</Text>
//             <Text style={styles.text}>Log in with account</Text>
//             <View style={styles.button}>
//             <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
//                 <LinearGradient
//                     colors={['#AFC8AD', '#88AB8E']}
//                     style={styles.signIn}
//                 >
//                     <Text style={styles.textSign}>Get Started</Text>
//                     <MaterialIcons 
//                         name="navigate-next"
//                         color="#fff"
//                         size={20}
//                     />
//                 </LinearGradient>
//             </TouchableOpacity>
//             </View>
//         </Animatable.View>
//       </View>
//     );
// };

// export default Welcome;

// const {height} = Dimensions.get("screen");
// const height_logo = height * 0.28;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     backgroundColor: '#88AB8E'
//   },
//   header: {
//       flex: 2,
//       justifyContent: 'center',
//       alignItems: 'center'
//   },
//   footer: {
//       flex: 1,
//       backgroundColor: '#fff',
//       borderTopLeftRadius: 30,
//       borderTopRightRadius: 30,
//       paddingVertical:30,
//       paddingHorizontal: 20
//   },
//   logo: {
//     width: 450,
//     height: 450
//   },
//   title: {
//       color: '#05375a',
//       fontSize: 26,
//       fontWeight: 'bold'
//   },
//   text: {
//       color: 'grey',
//       marginTop:10
//   },
//   button: {
//       alignItems: 'flex-end',
//       marginTop: 30
//   },
//   signIn: {
//       width: 150,
//       height: 40,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 50,
//       flexDirection: 'row'
//   },
//   textSign: {
//       color: 'white',
//       fontWeight: 'bold'
//   }
// });

import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
const { width: screenWidth } = Dimensions.get('window');

const splashImages = [
  require('../assets/welcome1.png'),
  require('../assets/3.png'),
  require('../assets/199.png'),
];

const Welcome = ({navigation}) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = event => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(slideIndex);
  };

  const handleSlideChange = index => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: index * screenWidth, animated: true });
    }
  };

  const skipSplashScreen = () => {
    onSkip();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {splashImages.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={[styles.image, { resizeMode: 'cover' }]}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {splashImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: currentIndex === index ? '#333' : '#ccc' },
            ]}
            onTouchEnd={() => handleSlideChange(index)}
          />
        ))}
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Text style = {styles.skipButton}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: screenWidth,
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  skipButton: {
    // position: 'absolute',
    // top: 730,
    // right: 40,
  },
});

export default Welcome;
