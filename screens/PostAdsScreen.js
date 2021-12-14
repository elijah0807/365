import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

const PostAdsScreen = props => {
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
        console.log(cat);
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
<Card title='Select Category'>
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
                flexDirection: "row",
                margin: 1,
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "flex-start",
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
            </View>
          )}
          //Setting the number of column
          numColumns={4}
          keyExtractor={(item, index) => index}
        /></Card>
        </SafeAreaView>
    )
}

export default PostAdsScreen

const styles = StyleSheet.create({})
