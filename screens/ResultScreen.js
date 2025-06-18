import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "../config";
import CustomButton from "../components/CustomButton";

const ResultScreen = ({ route, navigation }) => {
  const { result, imageUri, fromGallery } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [classificationResult, setClassificationResult] = useState(result);
  const [selectedImage, setSelectedImage] = useState(imageUri);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: "photo",
        allowsEditing: true,
        aspect: [32, 32],
        quality: 1,
      });

      if (!result.canceled) {
        await classifyImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Gagal memilih gambar");
    }
  };

  const classifyImage = async (uri) => {
    try {
      setLoading(true);
      setSelectedImage(uri);

      const formData = new FormData();
      formData.append("file", {
        uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();
      setClassificationResult(data);
    } catch (error) {
      Alert.alert("Error", "Gagal memproses gambar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fromGallery) pickImage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hasil Klasifikasi</Text>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : classificationResult ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Jenis Rumah: {classificationResult.class_name}
          </Text>
        </View>
      ) : (
        <Text style={styles.placeholderText}>Hasil akan muncul di sini</Text>
      )}

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Ambil Foto Lagi"
          onPress={() => navigation.navigate("Camera")}
        />
        <CustomButton
          title="Coba Gambar Lain"
          onPress={pickImage}
          style={{ backgroundColor: "#2196F3" }}
        />
      </View>
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
    marginBottom: 20,
    color: "#333",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
  placeholderText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default ResultScreen;
