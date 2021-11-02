import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity,Image } from "react-native";

const RegistrationSuccessful = () => {
    const navigation = useNavigation();
    const handleGoto = () => {
        navigation.navigate('HomeScreen');
      };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30
        }}
      >
        Registration Successful!
      </Text>
      <View style={{
          margin: 20
      }}></View>
      <Image source={require("../assets/mark.png")} style={styles.logo} />
      <View style={{
          margin: 20,
      }}></View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleGoto} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.footer}>
        <Text>Copyright 365買賣資訊</Text>
      </View>
    </View>
  );
};

export default RegistrationSuccessful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 250,
    width: 250,
    resizeMode: "cover",
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
