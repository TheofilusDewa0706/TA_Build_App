import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { useIsFocused } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { API_URL } from "../config";

const CameraScreen = ({ navigation }) => {
  const device = useCameraDevice("back");
  const camera = useRef(null);
  const isFocused = useIsFocused();
  const [isActive, setIsActive] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission !== "granted") {
        await Camera.requestCameraPermission();
      }
    };
    checkPermissions();
  }, []);

  const takePhoto = async () => {
    if (camera.current) {
      try {
        setIsProcessing(true);
        const photo = await camera.current.takePhoto({
          qualityPrioritization: "quality",
          flash: "off",
        });

        const formData = new FormData();
        formData.append("file", {
          uri: "file://" + photo.path,
          type: "image/jpeg",
          name: "photo.jpg",
        });

        const response = await fetch(API_URL, {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        navigation.navigate("Result", {
          imageUri: "file://" + photo.path,
          result: result,
        });
      } catch (error) {
        console.error("Error:", error);
        Alert.alert("Error", "Gagal memproses foto");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Kamera tidak tersedia</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused && isActive && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          photo={true}
        />
      )}

      <View style={styles.overlay}>
        {isProcessing ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <TouchableOpacity style={styles.captureButton} onPress={takePhoto} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  overlay: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
  },
  errorText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default CameraScreen;
