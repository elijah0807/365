import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  ActivityIndicator,
  // CheckBox,
} from "react-native";
// import CheckBox from '@react-native-community/checkbox';
import { CheckBox } from "react-native-elements";
import * as Location from "expo-location";
// import { auth, store } from "../firebase";
import Keys from "../constants/keys";
// import * from

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [taxId, setTaxId] = useState("");

  const [countryCode, setCountryCode] = useState("");
  const [countryShort, setCountryShort] = useState("");
  const [address, setAddress] = useState("");

  const [isCheck, setCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      Location.setGoogleApiKey(Keys.googleApiKey);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const place = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      // console.log(
      //   place[0].name +
      //     " " +
      //     place[0].street +
      //     " " +
      //     place[0].city +
      //     " " +
      //     place[0].subregion +
      //     " " +
      //     place[0].region +
      //     " " +
      //     place[0].country
      // );
      setCountry(place[0].country);
      setCountryShort(place[0].isoCountryCode);
      setAddress(place[0]);
      setLocation(location);
      // console.log(location.coords.latitude);
      fetchCountrcode();
      setIsLoading(false);
    })();
  }, []);

  const navigation = useNavigation();
  const handleGoto = () => {
    navigation.navigate("LoginScreen");
  };
  const fetchCountrcode = () => {
    var apiUrl = "https://bestbuy.space/phone.json"; //API to render signup

    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch(apiUrl, {
      method: "GET",
      headers: headers,
      body: JSON.stringify(), //convert data to JSON
    })
      .then((response) => response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
      .then((response) => {
        // console.log(response[countryShort]);
        setCountryCode(response[countryShort]);
      })
      .catch((error) => {
        console.log("error");
      });
  };
  const handleSignUp = () => {
    //   auth.createUserWithEmailAndPassword(email, password);
    var checkEmail = RegExp(
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i
    );
    setIsLoading(true);

    if (
      email.length == 0 ||
      password.length == 0 ||
      confirmPassword.length == 0 ||
      firstName.length == 0 ||
      lastName.length == 0 ||
      userName.length == 0 ||
      phone.length == 0 ||
      mobile.length == 0
    ) {
      Alert.alert("Required Field Is Missing!!!");
      setIsLoading(false);
    } else if (!checkEmail.test(email)) {
      Alert.alert("invalid email!!!");
      setIsLoading(false);
    }
    // Password validations
    else if (password.length < 6) {
      Alert.alert("Minimum 06 characters required!!!");
      setIsLoading(false);
    } else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
      Alert.alert("Use at least 1 special character!!!");
      setIsLoading(false);
    } else if (/[ ]/.test(password)) {
      Alert.alert("Don't include space in password!!!");
      setIsLoading(false);
    } else if (password !== confirmPassword) {
      Alert.alert("Password does not match!!!");
      setIsLoading(false);
    } else {
      setIsLoading(true);
      var apiUrl = "https://bestbuy.space/signup.php"; //API to render signup

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        email: email,
        password: password,
        username: userName,
        ver_code: Math.floor(100000 + Math.random() * 900000),
        firstname: firstName,
        lastname: lastName,
        phone: phone,
        mobile: countryCode + mobile,
        staff_name: staffName,
        staff_id: staffId,
        tax_id: taxId,
        status: 1,
        ev: 1,
        sv: 1,
        created_at: new Date(),
        updated_at: new Date(),
        policy_check: 1,
        address: address,
      };

      // FETCH func ------------------------------------
      fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data), //convert data to JSON
      })
        .then((response) => response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
        .then((response) => {
          if (response[0].Message == "success") {
            navigation.navigate("RegistrationSuccessful");
          } else {
            Alert.alert(response[0].Message);
            setIsLoading(false);
          }
          // Alert.alert(response[0].Message);
        })
        .catch((error) => {
          Alert.alert("Error Occured" + error);
          setIsLoading(false);
        });

      // auth
      //   .createUserWithEmailAndPassword(email, password)
      //   .then((userCredentials) => {
      //     const user = userCredentials.user;
      //     store.collection("users").doc(user.uid).set({
      //       email: email,
      //       user_id: user.uid,
      //       first_name: firstName,
      //       last_name: lastName,
      //       username: userName,
      //       country: country,
      //       phone: phone,
      //     });
      //     navigation.navigate("ContactInfo");
      //     console.log("Registered with:", user.email);
      //   })
      //   .catch((error) => setErrorText(error.message));
    }
  };
  return (
    // <KeyboardAvoidingView style={styles.container}>
    // isLoading ? (
    //   <View style={styles.container}>
    //     <ActivityIndicator size="large" color="#00ff00" />
    //   </View>
    // ) :
    <ScrollView
      style={styles.scrollView}
      // centerContent={true}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View style={styles.container}>
        <Image source={require("../assets/365.png")} style={styles.logo} />
        <Text
          style={{
            fontSize: 40,
            color: "black",
          }}
        >
          REGISTRATION
        </Text>
      </View>

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

      <View style={styles.inputContainer}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "50%",
            }}
          >
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              style={styles.input}
            />
          </View>
          <View
            style={{
              width: "45%",
            }}
          >
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              style={styles.input}
            />
          </View>
        </View>

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
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              width: "20%",
            }}
          >
            <Text
              style={{
                backgroundColor: "white",
                paddingHorizontal: 15,
                paddingVertical: 16,
                // borderRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                marginTop: 15,
              }}
            >
              +{countryCode}
            </Text>
          </View>
          <View
            style={{
              width: "80%",
            }}
          >
            <TextInput
              placeholder="Mobile"
              value={mobile}
              onChangeText={(text) => setMobile(text)}
              style={{
                backgroundColor: "white",
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                marginTop: 15,
              }}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "50%",
            }}
          >
            <TextInput
              placeholder="Staff Name"
              value={staffName}
              onChangeText={(text) => setStaffName(text)}
              style={styles.input}
              keyboardType="default"
            />
          </View>
          <View
            style={{
              width: "40%",
            }}
          >
            <TextInput
              placeholder="Staff Line Id"
              value={staffId}
              onChangeText={(text) => setStaffId(text)}
              style={styles.input}
              keyboardType="default"
            />
          </View>
        </View>
        <View
          style={{
            width: "50%",
          }}
        >
          <TextInput
            placeholder="Tax Id"
            value={taxId}
            onChangeText={(text) => setTaxId(text)}
            style={styles.input}
            keyboardType="default"
          />
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        {/* <CheckBox checked={isCheck}></CheckBox> */}
        <CheckBox
          checked={isCheck}
          onPress={setCheck}
          // onValueChange={setCheck}
          style={styles.checkbox}
        />
        <View style={styles.privacyView}>
          <Text>I agree to the </Text>
          <TouchableOpacity>
            <Text style={styles.privacyBtn}>Privacy Policy, </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.privacyBtn}>Service Terms, </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.privacyBtn}>Disclaimer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.footer}>
        <Text>Copyright 365買賣資訊</Text>
      </View> */}
      {/* </ScrollView> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoto} style={{ margin: 30 }}>
          <Text style={{ color: "black", fontSize: 16 }}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    // height: "100%",
    // marginHorizontal: 20,
  },
  scrollView: {
    marginHorizontal: 20,
    width: "100%",
    height: "90%",
  },
  logo: {
    height: 150,
    width: 250,
    resizeMode: "cover",
    alignContent: "center",
    alignItems: "center",
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
    height: "40%",
    width: "80%",
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
  checkboxContainer: {
    flexDirection: "row",
    // marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  privacyView: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  privacyBtn: {
    color: "#0782F9",
  },
});
