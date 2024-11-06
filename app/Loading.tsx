import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, useColorScheme, StatusBar, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const { height, width } = Dimensions.get('window');

const darkColors = {
  background: '#121212',
  text: '#FFFFFF',
  card: '#333333',
  accent: '#BB86FC',
};

export default function Loading() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // End loading after 1 second
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []); // Run only once on mount

  const reloadApp = () => {
    setIsLoading(false);
    router.replace('/Splash');
  };

  return (
    <View style={styles.container}>
       <StatusBar barStyle="light-content" backgroundColor="black" />

      {isLoading ? (
        <>
          <ActivityIndicator size="large" color="#BB86FC" />
          <Text style={styles.loadingText}>Loading...</Text>
        </>
      ) : (
        <>
          <Text style={styles.welcomeText}>Welcome to [App Name]!</Text>
          <Text style={styles.subtitleText}>{"\n\n"}✨ Come for the story. Stay for the jokes. ✨{"\n\n"}</Text>
          <Text style={styles.descriptionText}>Thank you for being part of something big! My goal is to reach 1 million people, and your support makes all the difference. By simply using the app once—or as many times as you'd like—you’re helping me grow as a developer and bring more creative ideas to life.{"\n\n"}</Text>
          <Text style={styles.descriptionText}>Enjoy an engaging story and get ready to laugh with jokes along the way! Your journey also supports future features, and who knows—there might even be opportunities for you!{"\n\n"}</Text>
          <Text style={styles.descriptionText}>Let’s get started and have some fun together!</Text>
          <TouchableOpacity style={styles.button} onPress={reloadApp}>
            <Text style={styles.buttonText}>Let's Begin!!</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black",
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  subtitleText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  descriptionText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00ffcc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
