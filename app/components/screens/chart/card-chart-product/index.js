import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { formatMoney } from "../../../../helper";
import { Entypo, Ionicons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
const CardChartProduct = (props) => {
  const { item, index } = props.data;
  let loading = false;
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 5,
        marginBottom: 5,
        marginHorizontal: 5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
        flexDirection: "row",
      }}
    >
      <Image
        source={{ uri: item.picture }}
        style={{
          resizeMode: "contain",
          width: (WIDTH - 5) / 4,
          height: (WIDTH - 5) / 4,
        }}
      />
      <View style={{ padding: 5 }}>
        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
        <Text>
          Rp {formatMoney(item.price)} x {item.quantity}
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          = Rp {formatMoney(+item.price * +item.quantity)}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => props.minusProduct(props.data)}>
            <Entypo name="minus" size={15} color="black" />
          </TouchableOpacity>
          <TextInput
            value={`${item.quantity}`}
            keyboardType="numeric"
            style={{ marginLeft: 5 }}
            onChangeText={(text) =>
              props.changeQuantityProduct(props.data, text)
            }
          />
          <TouchableOpacity onPress={() => props.plusProduct(props.data)}>
            <Entypo name="plus" size={15} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingLeft: 10 }}
            onPress={() => {
              Alert.alert("Hapus Produk", "Hapus Produk dari Keranjangmu?", [
                {
                  text: "Batal",
                  style: "cancel",
                },
                { text: "OK", onPress: () => props.deleteProduct(props.data) },
              ]);
            }}
          >
            <Ionicons name="md-trash-sharp" size={15} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardChartProduct;

const styles = StyleSheet.create({});
