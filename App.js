import React from 'react';
import Constants from 'expo-constants';
import 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';
import {Base64} from './Base64';

// Navigation methods and functions
import {NavigationContainer,useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import {DrawerContent} from './Drawer';

// Auth imports
import {AuthContext} from './auth/AuthContext';
import {firebase} from './auth/firebase/firebase';

// Auth Screens 
import LoginScreen from './Screens/Login/LoginScreen';
import SignUpDoctor from './Screens/Login/SignUpDoctor';
import SignUpPatient from './Screens/Login/SignUpPatient';

// Patient Screens
import DummyPatient from './Screens/Patient/DummyPatient';
// Doctor Screens
import DrawerNavigationDoctor from './Screens/Doctor/DrawerNavDoc';
import FirstPageDoc from './Screens/Doctor/firstPageDoc';
import Appointments from './Screens/Doctor/Appointments';
import Reports from './Screens/Doctor/reports';
import Patients from './Screens/Doctor/patients';
import PatientViewTab from './Screens/Doctor/PatientViewTab';
import { Entypo } from '@expo/vector-icons';

const Stack = createStackNavigator();
const abortController = new AbortController;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// registration for sending notifications
async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      
    } 
    else 
    {
      alert('Must use physical device for Push Notifications');
    } 
    return token;
}


export default function App(props){
    
    const [expoToken,setExpoToken] = React.useState('');
    const [notification,setNotification] = React.useState(false);
    const notificationListener = React.useRef();
    const responseListener = React.useRef();


    // updating collection with expo token for notification
    updateToken = async(ptoken,type) => {
        let token = {
          ExpoToken : ptoken,
        }
        if(type=="Doctor"){
            let doctor = await AsyncStorage.getItem('doctor');
            let where = "Store_Id ='"+doctor['_id']+"'";
            where = Base64.encode(where);
            token = Base64.encode(JSON.stringify(token))
            fetch('https://192.168.43.121:5000/update/doctors/'+token+'/'+where,{signal:abortController.signal})
            .then(response => response.json())
            .then((responseJson) => {
                if(responseJson.type==="Success")
                { 
                    console.log("Doctor Notification Token Updated Successfully");
                }
            })
            .catch(error => alert(error))
        }
        else{
            let patient = await AsyncStorage.getItem('patient');
            let where = "Patient_Id ='"+patient['_id']+"'";
            where = Base64.encode(where);
            token = Base64.encode(JSON.stringify(token))
            fetch('http://192.168.43.121:5000/update/patients/'+token+'/'+where,{signal:abortController.signal})
            .then(response => response.json())
            .then((responseJson) => {
                if(responseJson.type==="Success")
                { 
                console.log("Patient Notification Token Updated Successfully");
                }
            })
            .catch(error => alert(error))
        }
    }

    //reducer to maintain state of the app

    const initialState = {
        isLoading: true,
        userToken: null,
        loginType:null,
    }

    const reducer = (prevState, action) => {
        switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            loginType: action.lType,
            };
        case 'SIGN_IN':
            return {
            ...prevState,
            userToken: action.token,
            loginType:action.lType,
            };
        case 'SIGN_OUT':
            return {
            ...prevState,
            loginType:null,
            userToken: null,
            };
        }
    }
    const [loginState,dispatch] = React.useReducer(reducer,initialState);

    const authContext = React.useMemo(
        () => ({
          signIn: async (userType) => {
            if(userType === "doctor"){
            registerForPushNotificationsAsync().then(token => {
              let ptoken  = token;
              updateToken(ptoken,"doctor");
              }
            );
            }
            else{
              
              registerForPushNotificationsAsync().then(token => {
                let ptoken  = token;
                updateToken(ptoken,"patient");
                }
              );
            }
  
            dispatch({ type: 'SIGN_IN',token:true,lType:userType });
          },
          signOut: async() => {
            try{
            AsyncStorage.removeItem('doctor');
            AsyncStorage.removeItem('patient');
            }
            catch(e){
              console.log(e);
            }
                firebase.auth().signOut().then(function() {
                    console.log("Sign Out Successful");
                }).catch(function(error) {
                  alert(error+"Error signing out!! Please try again later or clear user data of the app.");
                });
                
            dispatch({ type: 'SIGN_OUT'});
          }
        }),
        []
    );

    React.useEffect(() =>
    {

        // HEADER - Notifications 
            registerForPushNotificationsAsync().then(token => setExpoToken(token))
        

            // This listener is fired whenever a notification is received while the app is foregrounded
            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });

            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                const data = response.notification.request.content.data;
                console.log(data);
                if(data.action="customer-orders")
                {
                props.navigation.navigate('Root',{screen: 'orderDetails',params: {type:"get",order:data.orderId}});
                // navigation.navigate('orderDetails',{order:data.orderId})
                }
                else if(data.action="admin-orders")
                {
                props.navigation.navigate('Root',{screen: 'orderDetails',params: {type:"get",order:data.orderId}});
                // navigation.navigate('orderDetails',{order:data.orderId})
                }
                else if(data.action="change-shop")
                {
                AsyncStorage.getItem( 'user' )
                    .then( recData => {

                    // the string value read from AsyncStorage has been assigned to data
                    

                    // transform it back to an object
                    let dat = JSON.parse( recData );

                    // Decrement
                    dat.Store_Id = data.storeId;

                    //save the value to AsyncStorage again
                    AsyncStorage.setItem( 'user', JSON.stringify( dat ));
                    

                    }).done();
                    this.props.emptyCart();
                    props.navigation.navigate('Root',{screen: 'Home',params: {reload:true}});
                    // navigation.navigate('orderDetails',{order:data.orderId})
                }
            });
        // END - Notifications

        // Restoring for userToken and choosing the navigation accordingly
            const bootstrapAsync = async () => {
                let userToken = null;
                let loginType = null;

                if(loginType == "patient"){
                    try {
                        let patient = await AsyncStorage.getItem('patient');
                        if(patient!=null)
                        {
                            userToken = true;
                            loginType = 'patient';
                        }
                    }
                    
                    
                    catch (e) {
                        console.log("error-"+e+"(Patient userToken could not be restored)");
                    }
                }   
                else{
                    try {
                        let doctor = await AsyncStorage.getItem('doctor');
                        if(doctor!=null){
                            userToken = true;
                            loginType = 'doctor';
                        }
                    } 
                    catch (e) {
                        console.log("error-"+e+"(Doctor userToken could not be restored)");
                    }
                }

                // After restoring token, we may need to validate it in production apps

                // This will switch to the App screen or Auth screen and this loading
                // screen will be unmounted and thrown away.
                dispatch({ type: 'RESTORE_TOKEN', token: userToken,lType: loginType });
            };
        // END - Restore UserToken

        // Calling and clearing of the functions
            bootstrapAsync();
        
            return function cleanUp(){
                Notifications.removeNotificationSubscription(notificationListener);
                Notifications.removeNotificationSubscription(responseListener);
            };
        // End

    },[]
    );
    const headerIcon=()=>{
        return(
          <Entypo name="menu" size={30} color="black" style={{marginLeft:20}} onPress={()=>props.navigation.openDrawer()}/>
        );
      };
    return(
        <NavigationContainer>
            <AuthContext.Provider value={authContext}>
            <Stack.Navigator>
                {loginState.isLoading == true ? (
                    <Stack.Screen name="Splash" component={LoginScreen} options={{headerShown:null}}/>
                ) : (
                    <>
                    {loginState.userToken == null ? (
                        <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{title:"Login",headerShown:null}}/>
                        <Stack.Screen name="SignUpPatient" component={SignUpPatient} options={{title:"Sign Up - Patient"}}/>
                        <Stack.Screen name="SignUpDoctor" component={SignUpDoctor} options={{title:"Sign Up - Doctor"}}/>
                        </>
                    ) : (
                        <>
                        {loginState.loginType == "doctor" ? (
                            // Doctor Screens
                            <>
                                <Stack.Screen name="Doctor" component={DrawerNavigationDoctor}/>
                                <Stack.Screen name="firstPageDoc" component={FirstPageDoc} options={{headerLeft:headerIcon,title:"Home"}}/>
                                <Stack.Screen name="appointments" component={Appointments} options={{headerLeft:headerIcon,title:"Appointments"}}/>
                                <Stack.Screen name="Reports" component={Reports} options={{headerLeft:headerIcon,title:"Reports"}}/>
                                <Stack.Screen name="Patients" component={Patients} options={{headerLeft:headerIcon,title:"Patients"}}/>
                                <Stack.Screen name="PatientViewTab" component={PatientViewTab} options={{headerLeft:headerIcon,title:'PatientView'}}/>
                            </>
                        ) : (
                            // Patients Screens
                            <>
                                <Stack.Screen name="dummyPatient" component={DummyPatient}/>
                            </>
                        )}
                        </>
                    )}

                    </>
                )}
                
            </Stack.Navigator>
            </AuthContext.Provider>
        </NavigationContainer>
    )
}

// PJ: do not uncomment the commented lines.

// You keep on adding the screens in the screens folder and add them here. We will take care of navigation more later.
// export default function App(){
    
// }