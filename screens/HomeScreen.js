import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Klasifikasi Rumah Adat NTT</Text>
      <Text style={styles.subtitle}>Pilih metode input gambar:</Text>

      <CustomButton
        title="Ambil Foto"
        onPress={() => navigation.navigate("Camera")}
      />

      <CustomButton
        title="Pilih dari Galeri"
        onPress={() => navigation.navigate("Result", { fromGallery: true })}
        style={{ backgroundColor: "#2196F3" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555",
  },
});

export default HomeScreen;
