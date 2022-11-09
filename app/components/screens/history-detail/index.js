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
import { formatMoney } from "../../../helper";
import { Entypo, Ionicons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
const CardHistoryDetailProduct = (props) => {
  const { item, index } = props.data;
  return (
    <View
      style={styles.container}
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
      </View>
    </View>
  );
};

export default CardHistoryDetailProduct;

const styles = StyleSheet.create({
  container: {
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
  },
});
