import { StyleSheet, useColorScheme, Alert, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import * as FileSystem from "expo-file-system/legacy";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DOWNLOAD_FOLDER_KEY = "android_download_folder_uri";

export default function App() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#ffffff";

  const handleMessage = async (event: any) => {
    try {
      if (!event.nativeEvent?.data) {
        return;
      }

      const message = JSON.parse(event.nativeEvent.data);
      if (message.type === "download") {
        const fileName =
          message.fileName || message.payload?.filename || message.filename;
        const data = message.data || message.payload?.data;
        const contentType =
          message.contentType ||
          message.payload?.mimeType ||
          "application/octet-stream";

        if (!data || !fileName) {
          console.warn("Missing data or fileName in download message");
          return;
        }

        const isBase64 =
          contentType === "application/pdf" ||
          (typeof data === "string" && data.startsWith("JVBERi"));
        const encoding = isBase64
          ? FileSystem.EncodingType.Base64
          : FileSystem.EncodingType.UTF8;

        if (Platform.OS === "android") {
          const { StorageAccessFramework } = FileSystem;
          let directoryUri = await AsyncStorage.getItem(DOWNLOAD_FOLDER_KEY);

          if (!directoryUri) {
            const permissions =
              await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (permissions.granted) {
              directoryUri = permissions.directoryUri;
              await AsyncStorage.setItem(DOWNLOAD_FOLDER_KEY, directoryUri);
            } else {
              Alert.alert(
                "Permission Denied",
                "Cannot save file without folder access.",
              );
              return;
            }
          }

          try {
            const fileUri = await StorageAccessFramework.createFileAsync(
              directoryUri,
              fileName,
              contentType,
            );
            await FileSystem.writeAsStringAsync(fileUri, data, { encoding });
            Alert.alert(
              "Download Complete",
              `File saved to your selected folder: ${fileName}`,
            );
          } catch (e) {
            // If the stored URI is no longer valid, clear it and try again
            await AsyncStorage.removeItem(DOWNLOAD_FOLDER_KEY);
            Alert.alert(
              "Download Failed",
              "Folder access lost. Please try again and select the Downloads folder.",
            );
          }
        } else {
          // iOS: Save to documentDirectory which is visible in Files app if UIFileSharingEnabled is true
          const fileUri = FileSystem.documentDirectory + fileName;
          await FileSystem.writeAsStringAsync(fileUri, data, { encoding });
          Alert.alert(
            "Download Complete",
            `File saved to PropeakCRM folder in Files app: ${fileName}`,
          );
        }
      }
    } catch (error) {
      console.error("Error handling WebView message:", error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <WebView
        style={styles.webview}
        source={{ uri: "http://192.168.31.28:3000" }} //Add deployed url here
        onMessage={handleMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
