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
  Pressable,
} from "react-native";
import { auth, store } from "../firebase";

const ContactInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const navigation = useNavigation();

  const handleSignUp = () => {
    //   auth.createUserWithEmailAndPassword(email, password);
    const user = auth.currentUser;
    store
      .collection("users")
      .doc(user.uid)
      .update({
        first_name: firstName,
        last_name: lastName,
        username: userName,
        country: country,
        phone: phone,
      })
      .then(() => {
        navigation.navigate("RegistrationSuccessful");
      });

    // console.log('Registered with:', user.email);

    //   .catch(error => alert(error.message))
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
        BASIC INFORMATION
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Country"
          value={country}
          onChangeText={(text) => setCountry(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={styles.input}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          //   onPress={handleLogin}
          style={{ margin: 30 }}
        >
          <Text style={{ color: "black", fontSize: 16 }}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.footer}>
        <Text>Copyright 365買賣資訊</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ContactInfo;

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
