import { Text, StyleSheet, View, Dimensions, StatusBar } from "react-native";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvilIcons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("screen").width;
class Profile extends Component {
  state = {
    user: {},
  };
  componentDidMount() {
    AsyncStorage.getItem("token")
      .then((token) => {
        if (!token) {
          throw "Error";
        }
        return AsyncStorage.getItem("user");
      })
      .then((user) => {
        if (!user) {
          throw "Error";
        }
        this.setState({ user: JSON.parse(user) });
      })
      .catch((error) => {
        this.props.navigation.goBack();
      });
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StatusBar
          translucent
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
        />
        <EvilIcons name="user" size={WIDTH / 2} color="black" />
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>Full Name: </Text>
            <Text>{this.state.user.full_name}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>Username: </Text>
            <Text>{this.state.user.username}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>Password: </Text>
            <Text>{"**********"}</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Profile;

const styles = StyleSheet.create({});
