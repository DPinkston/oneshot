import React, {useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import Header from '../components/appFooter';
import "com.google.android.gms.ads.MobileAds";
import "com.google.android.gms.ads.initialization.InitializationStatus";
import "com.google.android.gms.ads.initialization.OnInitializationCompleteListener";
import mobileAds from 'react-native-google-mobile-ads';


useEffect(() => {
  // Initialize Google Mobile Ads SDK
  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      console.log('Google Mobile Ads SDK initialized');
    });
}, []);

export default function AppLayout() {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Loading" options={{ headerShown: false }} />
        <Stack.Screen name="Splash" options={{ headerShown: false }} />
      </Stack>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

