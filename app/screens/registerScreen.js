import {KeyboardAvoidingView,Pressable,SafeAreaView,StyleSheet,Text,TextInput,View} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, color: "#662D91", fontWeight: "bold" }}>
            Register
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Create a New Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="black"
              style={{
                borderBottomWidth: 1,
                marginLeft: 14,
                borderBottomColor: "gray",
                width: 280,
                marginVertical: 10,
                fontSize: email ? 18 : 18,
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              placeholder="Email"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              placeholderTextColor="black"
              style={{
                borderBottomWidth: 1,
                marginLeft: 14,
                borderBottomColor: "gray",
                width: 280,
                marginVertical: 20,
                fontSize: password ? 18 : 18,
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="phone" size={24} color="black" />
            <TextInput
              placeholder="Email"
              value={phone}
              onChangeText={setPhone}
              placeholderTextColor="black"
              keyboardType="number-pad"
              style={{
                borderBottomWidth: 1,
                marginLeft: 14,
                borderBottomColor: "gray",
                width: 280,
                marginVertical: 20,
                fontSize: password ? 18 : 18,
              }}
            />
          </View>

          <Pressable
            style={{
              backgroundColor: "#318CE7",
              padding: 15,
              width: 200,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Register
            </Text>
          </Pressable>
          <Pressable
            style={{ marginTop: 20 }}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 17,
                color: "gray",
                fontWeight: "600",
              }}
            >
              Already have a account ? Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 28 : 0,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
  },
});
