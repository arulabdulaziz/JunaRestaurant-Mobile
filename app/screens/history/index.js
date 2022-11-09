import {
  Text,
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Alert,
  Dimensions,
} from "react-native";
import React, { Component } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import CardHistory from "../../components/screens/history/card-history";
import axios from "../../api/axios";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

class History extends Component {
  state = {
    loading: true,
    data: [],
  };
  componentDidMount() {
    this.fetch();
  }
  fetch = async () => {
    try {
      this.setState({ loading: true });
      const { data } = await axios.get("history", {
        headers: { token: this?.props?.route?.params?.token },
      });
      if (data?.data) {
        this.setState({ data: data.data });
        return;
      }
      throw "Error";
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : JSON.stringify(error);
      Alert.alert("Error", errorMessage);
      this.props.navigation.goBack();
    } finally {
      this.setState({ loading: false });
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
        <View style={styles.containerData}>
          <FlatList
            data={this.state.data}
            renderItem={(data) => (
              <CardHistory data={data} navigation={this.props.navigation} />
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
  containerData: {
    marginHorizontal: 5,
  },
  contentContainerStyleFlatList: {
    paddingBottom: HEIGHT / 10,
  },
});

export default History;
