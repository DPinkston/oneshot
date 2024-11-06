import React, { useState, useEffect } from 'react';
import {SafeAreaView,  StatusBar,  StyleSheet,  useColorScheme,  View, Dimensions, } from 'react-native';
import buttonsData from '../components/buttonsData';
// import 'react-native-reanimated';
import { router } from 'expo-router';
// import 'expo-dev-client';

// import { initializeApp } from 'expo-ads-admob';

// initializeApp({
//   androidAppId: 'ca-app-pub-3267958628972970/7959670122', // Your Android App ID
// })

// import mobileAds from 'react-native-google-mobile-ads';

// mobileAds()
//     .initialize()
//     .then(adapterStatuses => {
//         console.log("adMob inited")
// });

// mobileAds();


const { height, width } = Dimensions.get('window');

const darkColors = {
  background: '#121212',
  text: '#FFFFFF',
  card: '#333333',
  accent: '#BB86FC',
};




function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [hiddenButtons, setHiddenButtons] = useState<boolean[]>(buttonsData.map(() => false));
  const [clickedCount, setClickedCount] = useState(0);
  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const [currentPart, setCurrentPart] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldReload, setshouldReload] = useState(false);
  
  

  useEffect(() => {
    const timer = setTimeout(() => {
      
      if (isLoading) {
        setshouldReload(true);
      }
    }, 1000); 
  
    return () => clearTimeout(timer);
  }, [isLoading]); 


  useEffect(() => {
    if (shouldReload) {
      setshouldReload(false);
      reloadApp(); 
    }
    
    return () => {
    };
  }, [shouldReload]);
  
  const reloadApp = () => {
    setIsLoading(false); 
    router.replace('/Loading'); 
  };

  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkColors.background : '#F3F3F3',
  };


  return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

          <View style={[styles.mainContainer, { backgroundColor: isDarkMode ? darkColors.card : '#1a1a1a' }]}>
            {/* Add your content here */}
          </View>
        </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: "black", // Dark background for consistency
  },
  mainContainer: {
    flex: 1,
    backgroundColor:  'black', // Using dark gray for light mode for continuity
  },
});


export default App;
