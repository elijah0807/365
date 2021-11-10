import React, { useState, useEffect } from "react";
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
import { WebView } from "react-native-webview";
import words from "../constants/words";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
// import Card from "../components/Card";
import { Card, ListItem, Button, Icon,FAB } from "react-native-elements";
// import { useNavigation } from "@react-navigation/core";
import { FloatingAction } from "react-native-floating-action";

function HomeScreen ({navigation}) {
  const actions = [
    
    {
      text: "Ad Ads",
      icon: <FontAwesome name="plus" size={24} color="black" />,
      name: "add",
      position: 1
    },
    
  ];
  // const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("english");
  const [cat, setCat] = useState([]);
  const [products, setProducts] = useState([]);

  const switchChinese = () => {
    setLanguage("chinese");
  };
  const switchEn = () => {
    setLanguage("english");
  };

  const fetchCat = () => {
    var apiUrl = "https://bestbuy.space/getcategories.php"; //API to fetch cat

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
    // <WebView source={{ uri: 'https://bestbuy.space/' }} />
    <View style={styles.container}>
    {/* // <ScrollView> */}
      <ImageBackground
        source={require("../assets/veg_shop.jpg")}
        style={styles.image}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 30,
            alignItems: "flex-start",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginVertical: 10,
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Ionicons name="search" size={24} color="white" />
            <View style={styles.searchInputContainer}>
              <TextInput
                placeholder={
                  language === "english"
                    ? words.en_search
                    : words.chinese_search
                }
                value={search}
                onChangeText={(text) => setSearch(text)}
                style={styles.input}
              />
            </View>
            <View
              style={{
                marginHorizontal: 5,
              }}
            >
              {language === "english" ? (
                <TouchableOpacity onPress={switchChinese}>
                  <FontAwesome name="language" size={24} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={switchEn}>
                  <FontAwesome5 name="language" size={24} color="white" />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                marginHorizontal: 5,
              }}
            >
              <Ionicons name="notifications-sharp" size={24} color="white" />
            </View>
          </View>
        </View>
        <View
          style={{
            width: "80%",
            margin: 20,
          }}
        >
          <Text
            style={{
              textAlign: "auto",
              fontSize: 20,
              color: "black",
              fontWeight: "bold",
            }}
          >
            {language === "english" ? words.en_welcome : words.chinese_welcome}
          </Text>
          <Text
            style={{
              textAlign: "auto",
              fontSize: 14,
              color: "black",
              fontWeight: "bold",
            }}
          >
            {language === "english"
              ? words.en_welcome_sub
              : words.chinese_welcome_sub}
          </Text>
        </View>
      </ImageBackground>
      <ScrollView>

      
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Card styles={{ with: "60%" }}> */}
        <Card
          title={
            language === "english"
              ? words.en_categories
              : words.chinese_categories
          }
          containerStyle={{
            overflow: 'visible'
          }}
        >
          <Text style={styles.title}>Categories</Text>
          {/* <Text style={styles.title}>
           
          </Text> */}
          <FlatList
            data={cat}
            contentContainerStyle={{
              alignContent: "flex-start",
              flexGrow:1,
              overflow: 'visible'
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
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginVertical: 15,
            }}
          >
            <TouchableOpacity onPress={()=>{
              navigation.navigate('AllCategories');
            }}>
              <Text>See More...</Text>
            </TouchableOpacity>
          </View>
        </Card>
        <Card title="Products">
          <TouchableOpacity onPress={()=>{
            navigation.push('PostAd')
          }}>
          <Text style={styles.title}>Products</Text>
          </TouchableOpacity>
          <FlatList
            //Setting the number of column
            numColumns={2}
            keyExtractor={(item, index) => index}
            data={products}
            contentContainerStyle={{
              alignContent: "flex-start",
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  margin: 1,
                  justifyContent: "flex-start",
                  alignContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Card containerStyle={{
                  width: '95%'
                }} >
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                    }}
                    source={{
                      uri: `http://bestbuy.space/assets/images/item_image/${item.prev_image}`,
                    }}
                  />

                  <Text
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: 13,
                    }}
                  >
                    {item.title.toUpperCase()}
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: 10,
                    }}
                  >
                    {item.price}
                  </Text>
                </Card>
              </View>
            )}
          />
        </Card>
        
      </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

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
