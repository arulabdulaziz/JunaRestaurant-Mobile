import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React from "react";
import { formatMoney } from "../../../../helper";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "../../../../api/axios";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
const CardProduct = (props) => {
  const { item, index } = props.data;
  const isEven = index % 2 === 0;
  let loading = false;
  const addToChart = async () => {
    try {
      props.setLoading(true);
      const { data } = await axios.post(
        "product_to_chart",
        { product: { ...item, quantity: 1 } },
        {
          headers: { token: props?.token },
        }
      );
      if (data?.data) {
        Alert.alert("Berhasil", "Berhasil memasukkan ke keranjang");
        return;
      }
      throw "Error";
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : JSON.stringify(error);
      Alert.alert("Error", errorMessage);
    } finally {
      props.setLoading(false);
    }
  };
  return (
    <View
      style={{
        width: "50%",
        backgroundColor: "white",
        paddingVertical: 5,
        marginBottom: 20,
        marginRight: isEven ? 2.5 : 0,
        marginLeft: isEven ? 0 : 2.5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
        justifyContent: "center",
      }}
    >
      <Image
        source={{ uri: item.picture }}
        style={{
          resizeMode: "contain",
          width: (WIDTH - 20) / 2,
          height: HEIGHT / 5,
        }}
      />
      <View style={{ paddingLeft: 5 }}>
        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{}}>Rp {formatMoney(item.price)}</Text>
      </View>
      <TouchableOpacity
        onPress={addToChart}
        disabled={loading}
        style={{
          backgroundColor: "#054182",
          marginHorizontal: 5,
          alignItems: "center",
          borderRadius: 5,
          paddingVertical: 5,
        }}
      >
        <MaterialIcons name="add-shopping-cart" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CardProduct;

const styles = StyleSheet.create({});
