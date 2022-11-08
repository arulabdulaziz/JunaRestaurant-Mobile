import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  StatusBar
} from "react-native";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../api/axios";

export class Register extends Component {
  state = {
    username: "",
    password: "",
    full_name: "",
    loading: false,
  };
  submit = async () => {
    try {
      this.setState({ loading: true });
      const { username, password, full_name } = this.state;
      if (!username || !password || !full_name)
        return alert("Full Name, Username, Password Wajib Diisi!");
      const { data } = await axios.post("register", {
        full_name,
        username,
        password,
      });
      if (data?.data) {
        Alert.alert("Register Berhasil", "Silakan Login untuk melanjutkan");
        return this.props.navigation.goBack();
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
  componentDidMount() {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        this.props.navigation.replace("Main");
      }
    });
  }
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
          <Text>Full Name</Text>
          <TextInput
            value={this.state.full_name}
            onChangeText={(text) => this.setState({ full_name: text })}
            style={{ borderBottomColor: "black", borderBottomWidth: 0.5 }}
            placeholder="Full Name"
          />
        </View>
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
            Sudah Punya akun?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
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
              Silakan Login Disini
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
              <Text style={{ color: "white", textAlign: "center" }}>
                Register
              </Text>
            )}
          </>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Register;
