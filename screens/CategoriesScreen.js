import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";

const CategoriesScreen = (props) => {
  const navigation = useNavigation();
  const [language, setLanguage] = useState("english");
  const [cat, setCat] = useState([]);

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
  useEffect(() => {
    fetchCat();
  }, []);
  return (
    <SafeAreaView>
      <Card title={words.en_categories}>
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
                  navigation.navigate({
                    name: "Products",
                    params: {
                      products: products,
                      catId: item.id,
                      catName: item.name,
                    },
                  });
                }}
              >
                <Card
                  containerStyle={{
                    width: 60,
                    height: 100,
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

const styles = StyleSheet.create({});
