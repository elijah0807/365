import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

function Products({ navigation, route }) {
  const { catId } = route.params;
  const [sub_cat, setSubCat] = useState([]);
  const [isSubCat, setSeeSubCat] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [subcatid, setSubCatId] = useState("");
  // const productsData  = props.params('products');
  let { products } = route.params;

  const displayProducts = products.filter(
    (item) => item.category_id.indexOf(catId) >= 0
  );

  const displayFilter = displayProducts.filter(
    (item) => item.subcategory_id.indexOf(subcatid) >= 0
  );
  // console.log('filtered');
  // console.log(displayFilter);
  const displaySubCat = sub_cat.filter(
    (item) => item.category_id.indexOf(catId) >= 0
  );

  const fetchCat = () => {
    var apiUrl = "https://bestbuy.space/get_sub_categories.php"; //API to fetch sub cat

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
        setSubCat(response);
        // console.log(sub_cat);
      })
      .catch((error) => {
        console.log("error");
      });
  };
  useEffect(() => {
    fetchCat();
  }, []);
  return (<ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView style={{ flex: 1 }}>
      
      <View style={styles.sub}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Text style={styles.title}>Sub Categories</Text>
          {isSubCat ? (
            <TouchableOpacity
              onPress={() => {
                setSeeSubCat(false);
                setIsFiltered(false);
              }}
            >
              <Text
                style={{
                  color: "black",
                }}
              >
                Show All
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSeeSubCat(true);
              }}
            >
              <Text
                style={{
                  color: "black",
                }}
              >
                View More
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isSubCat && (
        <Card
          containerStyle={{
            padding: 10,
            marginVertical: 5,
          }}
        >
          <FlatList
            //Setting the number of column
            numColumns={1}
            keyExtractor={(item, index) => index}
            data={displaySubCat}
            contentContainerStyle={{
              alignContent: "flex-start",
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  borderColor: "grey",
                  borderWidth: 1,
                  padding: 10,
                  margin: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSeeSubCat(false);
                    setIsFiltered(true);
                    setSubCatId(item.id);
                  }}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </Card>
      )}
      {!isFiltered && (
        <Card styles={{ with: "60%" }}>
          <FlatList
            //Setting the number of column
            numColumns={2}
            keyExtractor={(item, index) => index}
            data={displayProducts}
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
                <Card
                  containerStyle={{
                    width: "95%",
                  }}
                >
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
      )}

      {isFiltered && (
        <Card styles={{ with: "60%" }}>
          <FlatList
            //Setting the number of column
            numColumns={2}
            keyExtractor={(item, index) => index}
            data={displayFilter}
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
                <Card
                  containerStyle={{
                    width: "95%",
                  }}
                >
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
      )}

      {/* </ScrollView> */}
    </SafeAreaView>
    </ScrollView>
  );
}

export default Products;

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
    color: "white",
  },
  sub: {
    marginTop: 15,
    backgroundColor: "red",
    padding: 15,
  },
  normalText: {},
});
