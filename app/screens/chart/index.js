import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { formatMoney } from "../../helper";
import axios from "../../api/axios";
import CardChartProduct from "../../components/screens/chart/card-chart-product";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
const chart = {
  user_id: "",
  no_table: 0,
  total_price: 0,
  is_checkouted: false,
  products: [],
  createdAt: "",
  updatedAt: "",
  __v: 0,
  id: "",
};
class Chart extends Component {
  state = {
    user: {},
    chart,
    token: "",
    loading: true,
    loadingCheckout: false,
  };
  componentDidMount() {
    AsyncStorage.getItem("token")
      .then((token) => {
        if (!token) {
          throw "Error";
        }
        this.setState({ token }, () => {
          this.fetchCart();
        });
      })
      .catch((error) => {
        this.props.navigation.goBack();
      });
  }
  componentWillUnmount() {
    this.submitChart();
  }
  submitChart = async () => {
    try {
      this.setState({ loading: true });
      const { data } = await axios.post("chart", this.state.chart, {
        headers: {
          token: this.state.token,
        },
      });
      if (data?.data && data.data?.id) {
        return this.setState({ chart: data.data });
      }
      throw "Error";
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  fetchCart = async () => {
    try {
      this.setState({ loading: true });
      const { data } = await axios.get("chart", {
        headers: {
          token: this.state.token,
        },
      });
      if (data?.data && data.data?.id) {
        return this.setState({ chart: data.data });
      }
      throw "Error";
    } catch (error) {
      console.log(error);
      this.props.navigation.goBack();
    } finally {
      this.setState({ loading: false });
    }
  };
  checkout = async () => {
    if (
      !this?.state?.chart?.no_table ||
      !Number(this?.state?.chart?.no_table)
    ) {
      return alert("Nomor Meja Wajib Diisi Dengan Benar!");
    }
    let products = this?.state?.chart?.products ?? [];
    products = products.filter(
      (e) =>
        e.id &&
        (Number(e.price) || Number(e.price) === 0) &&
        Number(e.quantity) &&
        e.name &&
        e.picture
    );
    if (!products || products.length === 0) {
      return alert("Produk Wajib Diisi Dengan Jumlah Minimal 1!");
    }
  };
  deleteProduct = ({ item, index }) => {
    const products =
      this?.state?.chart?.products?.filter((e) => e.id !== item.id) ?? [];
    const newChart = {
      ...this.state.chart,
      products,
    };
    newChart.total_price = newChart.products
      .map((e) => Number(e.price) * Number(e.quantity))
      .reduce((partialSum, a) => partialSum + a, 0);
    this.setState({
      chart: newChart,
    });
  };
  plusProduct = ({ item, index }) => {
    const newChart = {
      ...this.state.chart,
      products:
        this?.state?.chart?.products?.map((e) => {
          if (e.id === item.id) e.quantity = Number(e.quantity) + 1;
          return e;
        }) ?? [],
    };
    newChart.total_price = newChart.products
      .map((e) => Number(e.price) * Number(e.quantity))
      .reduce((partialSum, a) => partialSum + a, 0);
    this.setState({
      chart: newChart,
    });
  };
  minusProduct = ({ item, index }) => {
    const nextQuantity = Number(item.quantity) - 1;
    if (nextQuantity <= 0) {
      Alert.alert(
        "Hapus Produk",
        "Jumlah Produk akan menjadi 0, hapus produk?",

        [
          {
            text: "Batal",
            style: "cancel",
          },
          { text: "OK", onPress: () => this.deleteProduct({ item, index }) },
        ]
      );
      return;
    }
    const newChart = {
      ...this.state.chart,
      products:
        this?.state?.chart?.products?.map((e) => {
          if (e.id === item.id) e.quantity = nextQuantity;
          return e;
        }) ?? [],
    };
    newChart.total_price = newChart.products
      .map((e) => Number(e.price) * Number(e.quantity))
      .reduce((partialSum, a) => partialSum + a, 0);
    this.setState({
      chart: newChart,
    });
  };
  changeQuantityProduct = ({ item, index }, text) => {
    const newQuantity = String(Math.abs(Math.round(Number(text) || 0)));
    const newChart = {
      ...this.state.chart,
      products:
        this?.state?.chart?.products?.map((e) => {
          if (e.id === item.id) e.quantity = newQuantity;
          return e;
        }) ?? [],
    };
    newChart.total_price = newChart.products
      .map((e) => Number(e.price) * Number(e.quantity))
      .reduce((partialSum, a) => partialSum + a, 0);
    this.setState({
      chart: newChart,
    });
  };
  render() {
    return (
      <View>
        <StatusBar
          translucent
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
        />
        <Spinner visible={this.state.loading} color={"#054182"} />
        <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 16 }}>Total Harga:</Text>
          <Text style={{ fontWeight: "bold" }}>
            Rp {formatMoney(this?.state?.chart?.total_price ?? 0)}
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={this.checkout}
            disabled={this.state.loadingCheckout}
            style={{
              width: "95%",
              marginVertical: 10,
              backgroundColor: "#054182",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Checkout <AntDesign name="arrowright" size={14} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
            <Text>Nomor Meja</Text>
            <TextInput
              value={`${this.state.chart.no_table}`}
              onChangeText={(text) =>
                this.setState({
                  chart: {
                    ...this.state.chart,
                    no_table: String(Math.round(Number(text) || 0)),
                  },
                })
              }
              style={{ borderBottomColor: "black", borderBottomWidth: 0.5 }}
              placeholder="Nomor Meja"
              autoCapitalize="none"
              keyboardType="numeric"
            />
          </View>
          <FlatList
            data={this.state?.chart?.products ?? []}
            renderItem={(data) => (
              <CardChartProduct
                data={data}
                deleteProduct={this.deleteProduct}
                plusProduct={this.plusProduct}
                minusProduct={this.minusProduct}
                changeQuantityProduct={this.changeQuantityProduct}
              />
            )}
            keyExtractor={(item) => (item.id ? item.id : item.name)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: HEIGHT / 1.8,
            }}
          />
        </View>
      </View>
    );
  }
}
export default Chart;

const styles = StyleSheet.create({});
