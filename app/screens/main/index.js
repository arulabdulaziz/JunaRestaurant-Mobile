import {
  Text,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import CardProduct from "../../components/screens/main/card-product";
import MainHeader from "../../components/screens/main/header";
import axios from "../../api/axios";
import { TouchableOpacity } from "react-native-gesture-handler";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
export class Main extends Component {
  state = {
    loading: true,
    loadingFetch: true,
    errorFetch: false,
    data: [],
  };
  componentDidMount() {
    AsyncStorage.getItem("token")
      .then((token) => {
        if (!token) {
          this.props.navigation.replace("Login");
        } else {
          this.fetchProduct();
        }
      })
      .finally((_) => {
        this.setState({ loading: false });
      });
  }
  fetchProduct = async () => {
    try {
      this.setState({ loadingFetch: true });
      const { data } = await axios.get("product");
      if (data && data?.data) {
        return this.setState({ data: data.data, errorFetch: false });
      }
      throw "Error";
    } catch (error) {
      console.log(error);
      this.setState({ errorFetch: true });
      console.log(error, "<< error fetch product");
    } finally {
      this.setState({ loadingFetch: false });
    }
  };
  logout = async () => {
    try {
      this.setState({ loading: true });
      await AsyncStorage.clear();
      this.props.navigation.replace("Login");
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: true });
    }
  };
  render() {
    return (
      <View style={{ paddingTop: 20 }}>
        <StatusBar backgroundColor="#054182" />
        <Spinner visible={this.state.loading} color={"#054182"} />

        <MainHeader
          navigation={this.props.navigation}
          logout={() => this.logout()}
        />

        <View style={{ paddingHorizontal: 5, backgroundColor: "#f4f4f4" }}>
          <Text style={{ fontWeight: "bold", paddingHorizontal: 5 }}>
            Beberapa menu kami
          </Text>
          {this.state.loadingFetch && (
            <ActivityIndicator style={{ marginVertical: 10 }} size={25} />
          )}
          {this.state.errorFetch && !this.state.loadingFetch && (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ textAlign: "center" }}>
                Gagal Memuat Product, Silakan Coba Reload Dibawah
              </Text>
              <TouchableOpacity
                onPress={this.fetchProduct}
                style={{
                  backgroundColor: "#054182",
                  marginHorizontal: 5,
                  alignItems: "center",
                  borderRadius: 25,
                  paddingVertical: 5,
                }}
              >
                <Text style={{ color: "white" }}>Reload</Text>
              </TouchableOpacity>
            </View>
          )}
          <FlatList
            data={this.state.data}
            renderItem={(data) => <CardProduct data={data} />}
            keyExtractor={(item) => (item.id ? item.id : item.name)}
            numColumns={2}
            contentContainerStyle={{
              paddingBottom: HEIGHT / 4,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

export default Main;
