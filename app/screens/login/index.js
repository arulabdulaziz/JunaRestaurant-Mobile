import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StatusBar,
} from "react-native";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../api/axios";
export class Login extends Component {
  state = {
    username: "",
    password: "",
    loading: false,
  };
  componentDidMount() {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        this.props.navigation.replace("Main");
      }
    });
  }
  submit = async () => {
    try {
      this.setState({ loading: true });
      const { username, password } = this.state;
      if (!username || !password)
        return alert("Username, Password Wajib Diisi!");
      const { data } = await axios.post("login", {
        username,
        password,
      });
      if (data?.data?.token) {
        await AsyncStorage.setItem("token", data?.data?.token);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(data?.data?.user ?? {})
        );
        return this.props.navigation.replace("Main");
      }
      throw data;
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : JSON.stringify(error);
      alert(errorMessage);
    } finally {
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 10,
          backgroundColor: "white",
        }}
      >
        <StatusBar
          translucent
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
        />
        <View style={{ width: "90%", marginVertical: 10 }}>
          <Text>Username</Text>
          <TextInput
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })}
            style={{ borderBottomColor: "black", borderBottomWidth: 0.5 }}
            placeholder="Username"
            autoCapitalize="none"
          />
        </View>
        <View style={{ width: "90%", marginVertical: 10 }}>
          <Text>Password</Text>
          <TextInput
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
            style={{ borderBottomColor: "black", borderBottomWidth: 0.5 }}
            placeholder="*********"
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
        <View
          style={{ width: "90%", marginVertical: 20, flexDirection: "row" }}
        >
          <Text style={{ fontSize: 12, color: "#1166C2" }}>
            Belum Punya akun?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#1166C2",
                borderBottomColor: "#1166C2",
                borderBottomWidth: 0.5,
              }}
            >
              Daftar Disini
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={this.state.loading}
          style={{
            width: "90%",
            marginVertical: 10,
            backgroundColor: "#054182",
            padding: 10,
            borderRadius: 10,
          }}
          onPress={this.submit}
        >
          <>
            {this.state.loading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
            )}
          </>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Login;
