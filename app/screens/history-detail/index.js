import { Text, View, StyleSheet, FlatList, Dimensions } from "react-native";
import React, { Component } from "react";
import { formatMoney } from "../../helper/index";
import CardHistoryDetailProduct from "../../components/screens/history-detail";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

class HistoryDetail extends Component {
  render() {
    const { item } = this.props.route.params;
    return (
      <View style={styles.container}>
        <View style={styles.containerInfo}>
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
        <View >
          <FlatList
            data={item.products}
            renderItem={(data) => (
              <CardHistoryDetailProduct data={data} navigation={this.props.navigation} />
            )}
            keyExtractor={(item) => (item.id ? item.id : item.name)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyleFlatList}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  containerInfo: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  textDate: { marginBottom: 10 },
  containerTextInfo: { flexDirection: "row", marginVertical: 5 },
  textInfo: { fontWeight: "bold" },
  contentContainerStyleFlatList: {
    paddingBottom: HEIGHT / 2,
  },
});
export default HistoryDetail;
