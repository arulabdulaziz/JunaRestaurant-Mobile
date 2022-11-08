import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { formatMoney } from "../../helper";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
const chart = {
  user_id: "63690b06acccc9e218425224",
  no_table: 0,
  total_price: 111000,
  is_checkouted: false,
  products: [
    {
      name: "Matcha Latte",
      picture:
        "https://cdn0-production-images-kly.akamaized.net/83UHpzNFaypePOj2GWPr97XaRaE=/172x0:839x667/1200x900/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4055999/original/087914700_1655451637-shutterstock_1293089503.jpg",
      price: 20000,
      quantity: 2,
      id: "6368e179adc2b2ea91257157",
    },
    {
      name: "Ramen Special Kuah Karee",
      picture:
        "https://selerasa.com/wp-content/uploads/2015/05/images_mie_Mie_Ramen_26-mie-ramen-kuah-kari-1200x798.jpg",
      price: 28000,
      quantity: 2,
      id: "6368e31dadc2b2ea91257164",
    },
    {
      name: "Lemon Tea",
      picture:
        "https://dcostseafood.id/wp-content/uploads/2021/12/ES-LEMON-TEA.jpg",
      price: 15000,
      quantity: 1,
      id: "6368e332adc2b2ea91257166",
    },
  ],
  createdAt: "2022-11-08T11:40:18.198Z",
  updatedAt: "2022-11-08T11:48:15.604Z",
  __v: 0,
  id: "636a4022783705423962b9c6",
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
  fetchCart = async () => {
    try {
      this.setState({ loading: true });
    } catch (error) {
      console.log(error);
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
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Total Harga:</Text>
          <Text>Rp {formatMoney(this?.state?.chart?.total_price ?? 0)}</Text>
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
            renderItem={({ item, index }) => (
              <View style={{ height: 50 }}>
                <Text>{item.name}</Text>
              </View>
            )}
            keyExtractor={(item) => (item.id ? item.id : item.name)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}
export default Chart;

const styles = StyleSheet.create({});
