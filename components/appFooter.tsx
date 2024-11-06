// components/Header.tsx
import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { InterstitialAd, AdEventType, TestIds, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';




const Header: React.FC = () => {
//   const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3940256099942544/1033173712';
//   const [interstitialAd, setInterstitialAd] = useState<InterstitialAd | null>(null);
//   const [adLoaded, setAdLoaded] = useState(false);
  
//   const bannerAds = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3940256099942544/9214589741'
//   useEffect(() => {
//     const ad = InterstitialAd.createForAdRequest(adUnitId, {
//       requestNonPersonalizedAdsOnly: true,
//       keywords: ['fashion', 'clothing'],
//     });
  
//     const handleAdLoaded = () => {
//       console.log('Interstitial ad loaded');
//       setAdLoaded(true);
//       setInterstitialAd(ad);
//     };
  
//     const handleAdError = (error: any) => {
//       console.log('Interstitial ad error: ', error);
//     };
  
//     ad.addAdEventListener(AdEventType.LOADED, handleAdLoaded);
//     ad.addAdEventListener(AdEventType.ERROR, handleAdError);
  
//     // Start loading the ad
//     ad.load();
  
//     // Cleanup
//     return () => {
//       ad.removeAllListeners();
//     };
//   }, []);
  
//   const handleShowInterstitial = () => {
//     if (adLoaded && interstitialAd) {
//       interstitialAd.show().catch((error: any) => {
//         console.log('Error showing interstitial ad:', error);
//       });
//     } else {
//       console.log('Interstitial ad is not loaded yet or does not exist');
//     }
//   };

  
  return (
    <View style={styles.header}>


      <Text style={styles.headerText}>google ad here</Text>
      {/* <BannerAd
        unitId={bannerAds}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  headerText: { color: 'white', fontSize: 20 },
});

export default Header;
