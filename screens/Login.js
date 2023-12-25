import React, { useState, useContext} from 'react';
import { StatusBar } from 'react-native';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from './AuthContext';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import { set } from 'date-fns';
const Login = () => {
  const { colors } = useTheme();

  const navigation = useNavigation();
  
  const {id ,email , setEmail,password,setId, setPassword,isAuthenticated,setisAuthenticated, updateData, setUpdateData}= useContext(AuthContext);

  const handleLogin = (email, password) => {

    // if (email === '20522134@gm.uit.edu.vn' && password === 'huynhthibichtuyen') {
    //     setisAuthenticated(true);
    // } else {
    //     Alert.alert('Warning', 'incorrect email or password.');
    // };
    // nhập thonog tin đăng nhập -> gửi lên server -> database -> gửi về cho front end 
    // 1 sai mk, mail
    const request = {
      "email": email,
      "password": password
    }
        axios.post(`http://134.209.108.2:3002/api/login`,request, {
        headers: {
          'Content-Type': 'application/json',
        },}
    )
        .then(response => {
        // Alert.alert('Warning', 'correct email and password.');
        console.log('Dữ liệu nhận được sau khi gửi POST request:', response.data);
        let data = response.data.user;
        setEmail(data.email);
        setPassword(data.password);
        setId(data._id);
        setisAuthenticated(true);
        setUpdateData(!updateData);
        })
        .catch(error => {
          // hien thi o day
          Alert.alert('Warning', 'incorrect email or password.');
        });
  };
  const handleOnPressSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#79AC78' barStyle="light-content"/>
      <View style={styles.header}>
          <Text style={styles.text_header}>Welcome!</Text>
      </View>
      
      <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
      > 
         <Text style={[styles.text_footer, {
                color: colors.text
          }]}>Username
          </Text>
          <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                
            <TextInput
                    placeholder="Your email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    value={email}
                    autoCapitalize="none"
                    onChangeText={setEmail}
            />
            <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
        </View>
      

      <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
          <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
        <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
                color: colors.text
            }]}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
        />
        <Feather 
            name="eye"
            color="grey"
            size={20}
        />
      </View>

      <TouchableOpacity>
          <Text style={{color: '#009387', marginTop:30, marginLeft:250}}>Forgot password?</Text>
      </TouchableOpacity>
      
      <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => handleLogin(email, password)}
                >
                  <LinearGradient
                      colors={['#AFC8AD', '#88AB8E']}
                      style={styles.signIn}
                  >
                      <Text style={[styles.textSign, {
                          color:'#fff'
                      }]}>Login</Text>
                  </LinearGradient>
                </TouchableOpacity>

            </View>

            <Text style={styles.text}> Or login with</Text>

            <View style={styles.imageContainer}>
              <Image
                style={styles.imageLogo}
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' }}
              />
              <Image
                style={styles.imageLogo}
                source={{ uri: 'https://logowik.com/content/uploads/images/gmail-new-icon5198.jpg' }}
              />
            </View>

            <View style={styles.signUpContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={handleOnPressSignup}>
                <Text style={styles.signUpText}>Sign up.</Text>
              </TouchableOpacity>
            </View>

      </Animatable.View>
  </View>
);
};

const styles = StyleSheet.create({

text: {
  alignSelf: 'center',
  marginTop: 20,
  fontSize: 20,
  fontWeight: 'bold',
},
imageContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
},
imageLogo: {
  width: 35,
  height: 35,
  borderRadius: 25,
  margin: 5,
},
signUpContainer: {
  flexDirection: 'row',
  marginTop: 15,
  alignSelf: 'center',
},
signUpText: {
  color: 'blue',
},

container: {
  flex: 1, 
  backgroundColor: '#88AB8E'
},
header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
},
footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
},
text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
},
text_footer: {
    color: '#05375a',
    fontSize: 18
},
action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
},
textInput: {
    flex: 1,
    marginTop: -5,
    paddingLeft: 10,
    color: '#05375a',
},
errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
button: {
    alignItems: 'center',
    marginTop: 15
},
signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
}
})
export default Login;




// import React from 'react';
// import { 
//     View, 
//     Text, 
//     TouchableOpacity, 
//     TextInput,
//     StyleSheet ,
//     StatusBar,
//     Alert
// } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import { LinearGradient } from "expo-linear-gradient";
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';

// import { useTheme } from 'react-native-paper';


// const Login = ({navigation}) => {

//     const [data, setData] = React.useState({
//         username: '',
//         password: '',
//         check_textInputChange: false,
//         secureTextEntry: true,
//         isValidUser: true,
//         isValidPassword: true,
//     });

//     const { colors } = useTheme();

//     const updateSecureTextEntry = () => {
//         setData({
//             ...data,
//             secureTextEntry: !data.secureTextEntry
//         });
//     }

//     return (
//       <View style={styles.container}>
//         <StatusBar backgroundColor='#00A9FF' barStyle="light-content"/>
//         <View style={styles.header}>
//             <Text style={styles.text_header}>Welcome!</Text>
//         </View>
//         <Animatable.View 
//             animation="fadeInUpBig"
//             style={[styles.footer, {
//                 backgroundColor: colors.background
//             }]}
//         >
//             <Text style={[styles.text_footer, {
//                 color: colors.text
//             }]}>Username</Text>
//             <View style={styles.action}>
//                 <FontAwesome 
//                     name="user-o"
//                     color={colors.text}
//                     size={20}
//                 />
//                 <TextInput 
//                     placeholder="Your Username"
//                     placeholderTextColor="#666666"
//                     style={[styles.textInput, {
//                         color: colors.text
//                     }]}
//                     autoCapitalize="none"
                  
//                 />
//                 {data.check_textInputChange ? 
//                 <Animatable.View
//                     animation="bounceIn"
//                 >
//                     <Feather 
//                         name="check-circle"
//                         color="green"
//                         size={20}
//                     />
//                 </Animatable.View>
//                 : null}
//             </View>
  
//             <Text style={[styles.text_footer, {
//                 color: colors.text,
//                 marginTop: 35
//             }]}>Password</Text>
//             <View style={styles.action}>
//                 <Feather 
//                     name="lock"
//                     color={colors.text}
//                     size={20}
//                 />
//                 <TextInput 
//                     placeholder="Your Password"
//                     placeholderTextColor="#666666"
//                     secureTextEntry={data.secureTextEntry ? true : false}
//                     style={[styles.textInput, {
//                         color: colors.text
//                     }]}
//                     autoCapitalize="none"
                
//                 />
//                 <TouchableOpacity
//                     onPress={updateSecureTextEntry}
//                 >
//                     {data.secureTextEntry ? 
//                     <Feather 
//                         name="eye-off"
//                         color="grey"
//                         size={20}
//                     />
//                     :
//                     <Feather 
//                         name="eye"
//                         color="grey"
//                         size={20}
//                     />
//                     }
//                 </TouchableOpacity>
//             </View>
            
//             <TouchableOpacity>
//                 <Text style={{color: '#009387', marginTop:15, marginLeft:250}}>Forgot password?</Text>
//             </TouchableOpacity>
//             <View style={styles.button}>
                
//                 <TouchableOpacity
//                     style={styles.signIn}
                  
//                 >
//                 <LinearGradient
//                     colors={['#A0E9FF', '#00A9FF']}
//                     style={styles.signIn}
//                 >
//                     <Text style={[styles.textSign, {
//                         color:'#fff'
//                     }]}>Login</Text>
//                 </LinearGradient>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     onPress={() => navigation.navigate('Signup')}
//                     style={[styles.signIn, {
//                         borderColor: '#00A9FF',
//                         borderWidth: 1,
//                         marginTop: 15
//                     }]}
//                 >
//                     <Text style={[styles.textSign, {
//                         color: '#00A9FF'
//                     }]}>Signup</Text>
//                 </TouchableOpacity>
//             </View>
//         </Animatable.View>
//       </View>
//     );
// };

// export default Login;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1, 
//       backgroundColor: '#00A9FF'
//     },
//     header: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         paddingHorizontal: 20,
//         paddingBottom: 50
//     },
//     footer: {
//         flex: 3,
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         paddingHorizontal: 20,
//         paddingVertical: 30
//     },
//     text_header: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 30
//     },
//     text_footer: {
//         color: '#05375a',
//         fontSize: 18
//     },
//     action: {
//         flexDirection: 'row',
//         marginTop: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#f2f2f2',
//         paddingBottom: 5
//     },
//     actionError: {
//         flexDirection: 'row',
//         marginTop: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#FF0000',
//         paddingBottom: 5
//     },
//     textInput: {
//         flex: 1,
//         paddingLeft: 10,
//         color: '#05375a',
//     },
//     errorMsg: {
//         color: '#FF0000',
//         fontSize: 14,
//     },
//     button: {
//         alignItems: 'center',
//         marginTop: 50
//     },
//     signIn: {
//         width: '100%',
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10
//     },
//     textSign: {
//         fontSize: 18,
//         fontWeight: 'bold'
//     }
//   });
