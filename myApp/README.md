# PropeakCRM - React Native Mobile App

Welcome to the **PropeakCRM** mobile app project! This project is built using React Native and Expo. It provides a robust, seamless interface for task and project management on both Android and iOS devices.

---

## 🚀 Deployment Link

> **Live Preview / Production URL:** [Insert Deployment Link Here]

_(Note: Replace the placeholder above with your actual App Store, Google Play Store, or Expo EAS preview link)_

---

## 🛠️ Setup Instructions (Local Development)

To run this application locally and start developing, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Expo CLI / EAS CLI](https://docs.expo.dev/get-started/installation/)
- Expo Go app on your physical device, or Android Studio / Xcode for local emulation.

### 1. Clone & Install Dependencies

```bash
# Navigate to the project directory
cd myApp

# Install dependencies using npm (or yarn/bun)
npm install
```

### 2. Start the Development Server

```bash
npx expo start
```

This will start the Expo Metro Bundler. You can scan the QR code with the **Expo Go** app on your phone, or press `a` to run it on an Android emulator, or `i` for the iOS simulator.

---

## 🎨 Icon & Splash Screen Configuration

The application's branding assets are configured centrally in `app.json`. The app uses the Propeak logo for all platform icons and the splash screen.

**Current Configuration Details (`app.json`):**

- **Icon:** `./assets/propeaklogo.png`
- **Splash Screen:**
  - Image: `./assets/propeaklogo.png`
  - Resize Mode: `contain`
  - Background Color: `#ffffff`
- **Android Adaptive Icon:**
  - Foreground: `./assets/propeaklogo.png`
  - Background Color: `#ffffff`

To update the icon or splash screen, simply replace `./assets/propeaklogo.png` with your new image asset, or update the corresponding paths in the `app.json` file.

---

## 🌐 Expo Account Setup (Register & Login)

To fully utilize Expo Application Services (EAS) for cloud builds and deployments, you will need an Expo account.

### 1. Register for an Account

1. Visit the official Expo website: [https://expo.dev/](https://expo.dev/)
2. Click on the **Sign Up** button in the top right corner.
3. Fill in your details (Email, Username, Password) or sign up using your GitHub account.
4. Verify your email address if required.

### 2. Login to Your Account

1. Once registered, navigate to [https://expo.dev/login](https://expo.dev/login) or click **Log In** on the homepage.
2. Enter your credentials to access your Expo dashboard.
3. **CLI Login:** To link your local development environment to your account, run the following command in your terminal:

   ```bash
   expo login
   ```

   _You will be prompted to enter your Expo username/email and password._

---

## 📦 Building an APK

Here are **two precise ways to build an APK in React Native Expo**:

### ✅ 1. Expo Cloud Build (Recommended – Fast & Simple)

This uses Expo CLI and EAS Build.

#### 🔧 Step-by-step

**1. Install Expo CLI & EAS**

```bash
npm install -g expo-cli
npm install -g eas-cli
```

**2. Login to Expo**

```bash
expo login
```

**3. Initialize EAS in your project**

```bash
eas build:configure
```

This creates:

- `eas.json` (build config)
- Links your project to Expo account

**4. Configure APK build**
Edit `eas.json`:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

**5. Start APK Build**

```bash
eas build -p android --profile preview
```

**6. Download APK**

- Expo will provide a download URL in your terminal.
- Alternatively, check the Expo Dev Tools dashboard.

**🔥 Advantages**

- No native Android setup required.
- Works seamlessly on any OS.
- Fast CI/CD style builds.

---

### ✅ 2. Local APK Build (Gradle – Full Control)

This requires you to have a full local native Android setup (Android SDK, Java, etc.).

#### 🔧 Step-by-step

**1. Prebuild (Generate native folders)**

```bash
npx expo prebuild
```

This creates the native `/android` and `/ios` directories.

**2. Open Android Project**

```bash
cd android
```

**3. Build APK using Gradle**

_Debug APK (Quick test)_

```bash
./gradlew assembleDebug
```

👉 **Output:** `android/app/build/outputs/apk/debug/app-debug.apk`

_Release APK (Production)_

```bash
./gradlew assembleRelease
```

👉 **Output:** `android/app/build/outputs/apk/release/app-release.apk`

**4. Signing APK (IMPORTANT for release)**

Edit `android/gradle.properties`:

```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

Update `android/app/build.gradle`:

```gradle
signingConfigs {
    release {
        storeFile file(MYAPP_UPLOAD_STORE_FILE)
        storePassword MYAPP_UPLOAD_STORE_PASSWORD
        keyAlias MYAPP_UPLOAD_KEY_ALIAS
        keyPassword MYAPP_UPLOAD_KEY_PASSWORD
    }
}
```

**5. Install APK**

```bash
adb install app-release.apk
```

---

### 🚀 Quick Commands Summary

**Expo APK**

```bash
expo login
eas build -p android --profile preview
```

For Expo clean build when change app icon or splash screen

```bash
eas build -p android --profile preview --clear-cache
```

**Local APK**

```bash
npx expo prebuild
cd android
./gradlew assembleRelease
```
