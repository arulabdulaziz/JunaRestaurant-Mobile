import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";

const MainHeader = (props) => {
  const navigation = props.navigation;
  return (
    <View
      style={{
        backgroundColor: "#054182",
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
      }}
    >
      {/* Chart */}
      <TouchableOpacity
        style={{ width: "10%" }}
        onPress={() => {
          navigation.navigate("Chart");
        }}
      >
        <Entypo name="shopping-cart" size={30} color="white" />
      </TouchableOpacity>
      {/* History */}
      <TouchableOpacity
        style={{ width: "10%" }}
        onPress={() => {
          navigation.navigate("History", { token: props?.token });
        }}
      >
        <Ionicons name="receipt" size={30} color="white" />
      </TouchableOpacity>
      {/* Text */}
      <View style={{ width: "60%" }}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Pilih Produk Kami
        </Text>
      </View>
      {/* Profile */}
      <TouchableOpacity
        style={{ width: "10%" }}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Entypo name="user" size={30} color="white" />
      </TouchableOpacity>
      {/* Logout */}
      <TouchableOpacity
        style={{ width: "10%" }}
        onPress={() => {
          Alert.alert("Logout", "Apakah Kamu yakin Akan Logout?", [
            {
              text: "Batal",
              style: "cancel",
            },
            { text: "OK", onPress: props.logout },
          ]);
        }}
      >
        <MaterialIcons name="logout" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({});
