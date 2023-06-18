import { StyleSheet, Text, View,TextInput,KeyboardAvoidingView,SafeAreaView,Pressable } from "react-native";
import React,{useEffect, useState} from "react";
import { MaterialCommunityIcons,Ionicons  } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ActivityIndicator } from "react-native";

const LoginScreen = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const[emailFocus,setEmailFocus] = useState(false);
    const[passwordFocus,setPasswordFocus] = useState(false);
    const [loading,setLoading] = useState(false);
    const navigation = useNavigation();
    
    useEffect(()=>{
      setLoading(true)
      const unsuscribe = auth.onAuthStateChanged((authUser)=>{

        if(!authUser){
          setLoading(false)
        }

        if(authUser){
          navigation.navigate('Home');
        }
      })
      return unsuscribe;
    },[])

    const loginUser = () =>{
      signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        console.log("userCredential is ",userCredential)
        const user = userCredential.user;
        console.log("user is ",user)
      })
    }


  return (
    <SafeAreaView style={styles.androidSafeArea}>
      {loading?(
        <View style={{flex:1,alignItems:"center",flexDirection:"row"}}> 
          <Text style={{fontSize:20}}>Loading...</Text>
          <ActivityIndicator size="large" />
        </View>
      ):
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, color: "#662D91", fontWeight: "bold" }}>
            Sign In
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Sign In to your account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View style={{flexDirection:"row",alignItems:"center",}}>
            <MaterialCommunityIcons name="email-outline"  size={24}  color={emailFocus?"#318CE7":"black"}  />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} onFocus={()=>{
              setEmailFocus(true)
              setPasswordFocus(false)
            }}  keyboardType="email-address" placeholderTextColor="black" style={{borderBottomWidth:1,marginLeft:14,borderBottomColor:"gray",width:280,marginVertical:10,fontSize:email?18:18}} />
          </View>
          <View style={{flexDirection:"row",alignItems:"center",}}>
          <Ionicons name="key-outline" size={24} color={passwordFocus?"#318CE7":"black"} />
          <TextInput placeholder="Password" value={password} onChangeText={setPassword} onFocus={()=>{
              setPasswordFocus(true)
              setEmailFocus(false)
            }} secureTextEntry={true} placeholderTextColor="black" style={{borderBottomWidth:1,marginLeft:14,borderBottomColor:"gray",width:280,marginVertical:20,fontSize:password?18:18,}} />
          </View>

          <Pressable onPress={loginUser} style={{backgroundColor:"#318CE7",padding:15,width:200,marginTop:50,marginLeft:"auto",marginRight:"auto",borderRadius:10}} >
            <Text style={{fontSize:18,textAlign:"center",color:"white"}}>Login</Text>
          </Pressable>
          <Pressable style={{marginTop:20}} onPress={()=>navigation.navigate('registerScreen')} >
            <Text style={{alignSelf:"center",fontSize:17,color:"gray",fontWeight:"600"}}>Don't have a account ? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      }
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 28 : 0,
    backgroundColor: "white",
    padding: 10,
    alignItems:"center"
  },
});
