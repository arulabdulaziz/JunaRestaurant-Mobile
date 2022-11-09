import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { formatMoney } from "../../../../helper";
const CardHistory = (props) => {
  const { navigation, data } = props;
  const { item, index } = data;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("HistoryDetail", { item, index })}
      >
        <View>
          <Text style={styles.textDate}>{`${new Date(
            item.updatedAt
          ).toLocaleString("id")}`}</Text>
          <View style={styles.containerTextInfo}>
            <Text style={styles.textInfo}>Nomor Meja: </Text>
            <Text>{item.no_table}</Text>
          </View>
          <View style={styles.containerTextInfo}>
            <Text style={styles.textInfo}>Jumlah Produk: </Text>
            <Text>
              {item.products
                .map((e) => Number(e.quantity))
                .reduce((partialSum, a) => partialSum + a, 0)}
            </Text>
          </View>
          <View style={styles.containerTextInfo}>
            <Text style={styles.textInfo}>Total Harga: </Text>
            <Text>{formatMoney(item.total_price)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardHistory;

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  card: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 5,
  },
  textDate: { marginBottom: 10 },
  containerTextInfo: { flexDirection: "row", marginVertical: 5 },
  textInfo: { fontWeight: "bold" },
});
