import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import Header from '../components/appFooter';

export default function AppLayout() {
  return (
    <View style={styles.container}>
      {/* Add the StatusBar component */}
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

