import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert
} from "react-native";
import { auth, store } from "../firebase";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const navigation = useNavigation();
  const handleGoto = () => {
    navigation.navigate('LoginScreen');
  };
  const handleSignUp = () => {
    //   auth.createUserWithEmailAndPassword(email, password);

    if (password === confirmPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          store.collection("users").doc(user.uid).set({
            email: email,
            user_id: user.uid,
          });
          navigation.navigate("ContactInfo");
          console.log("Registered with:", user.email);
        })
        .catch((error) => setErrorText(error.message));
    } else {
      setErrorText('Password mismatch');
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      
      <Image source={require("../assets/365.png")} style={styles.logo} />
      
      <Text
        style={{
          fontSize: 40,
          color: "black",
        }}
      >
        LOGIN INFORMATION
      </Text>
      
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={{
          paddingTop: 10,
        //   paddingBottom: 10,
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          alignItems:'flex-start'
      }}>
      <Text
        style={{
          fontSize: 20,
          color: "red",
          textAlign: 'left'
        }}
      >{errorText}
        
      </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={handleGoto}
          
          style={{ margin: 30 }}
        >
          <Text style={{ color: "black", fontSize: 16 }}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text>Copyright 365買賣資訊</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    // paddingTop: 10,
    height: "100%",
  },
  logo: {
    height: 150,
    width: 250,
    resizeMode: "cover",
  },
  inputContainer: {
    width: "90%",
  },
  footer: {
    width: "100%",
    height: 50,
    // backgroundColor: '#EE5407',
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", //Here is the trick
    bottom: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    height: '40%',
    width:'80%',
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
   
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#3ad151",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
