import React, {useState, useEffect} from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import Products from "./Products";

const CategoriesScreen = (props) => {
  const navigation = useNavigation();
  const [language, setLanguage] = useState("english");
  const [cat, setCat] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchCat = () => {
    var apiUrl = "https://bestbuy.space/allcategories.php"; //API to render signup

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
        setCat(response);
        // console.log(cat);
      })
      .catch((error) => {
        console.log("error");
      });
  };
  const fetchProduct = () => {
    var apiUrl = "https://bestbuy.space/get_products.php"; //API to fetch product

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
        setProducts(response);
        // console.log(products);
      })
      .catch((error) => {
        console.log("error");
      });
  };
  useEffect(() => {
    fetchCat();
    fetchProduct();
  }, []);
  return (
    <SafeAreaView style={{
      // marginTop: 40,
    }}>
      <Card title='All Categories'>
      <Text style={styles.title}>Categories</Text>
        {/* <Text style={styles.title}>
           
          </Text> */}
        <FlatList
            data={cat}
            contentContainerStyle={{
              alignContent: "flex-start",
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  margin: 1,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Products", {
                      products: products,
                      catId: item.id,
                      catName: item.name,
                    });
                  }}
                >
                  <Card
                    containerStyle={{
                      width: 70,
                      height: 60,
                      margin: 2,
                      padding: 5,
                    }}
                  >
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={{
                        uri: `http://bestbuy.space/assets/images/category/${item.image}`,
                      }}
                    />
                    <Text
                      style={{
                        // textAlign: 'center',
                        // fontWeight: 'bold',
                        fontSize: 8,
                      }}
                    >
                      {item.name.toUpperCase()}
                    </Text>
                  </Card>
                </TouchableOpacity>
              </View>
            )}
            //Setting the number of column
            numColumns={4}
            keyExtractor={(item, index) => index}
          />
      </Card>
    </SafeAreaView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    // padding: 10,
    // height: "100%",
    // marginHorizontal: 20,
  },
  scrollView: {
    marginHorizontal: 20,
    width: "100%",
    height: "90%",
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
    // alignContent: "center",
    // alignItems: "center",
    // justifyContent: "center",
  },
  searchInputContainer: {
    width: "70%",
    marginHorizontal: 5,
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    // marginTop: 10,
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
  title: {
    textAlign: "auto",
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  normalText: {},
});

