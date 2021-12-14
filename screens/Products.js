import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

const Products = (navigation, route) => {
  const { catId } = route.params;
  let { productsData } = route.params;

  let displayProducts = productsData
    .filter((item) => item.category_id == { catId })
    .map(({ title, price, prev_image }) => ({ title, price, prev_image }));

  return (
    <SafeAreaView>
      <ScrollView>
        <Card styles={{ with: "60%" }}>
          <Text style={styles.title}>
            {language === "english"
              ? words.en_categories
              : words.chinese_categories}
          </Text>
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
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Card>
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
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 13,
                    }}
                  >
                    {item.title.toUpperCase()}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 13,
                    }}
                  >
                    {item.price}
                  </Text>
                </Card>
              </View>
            )}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  },
  normalText: {},
});
