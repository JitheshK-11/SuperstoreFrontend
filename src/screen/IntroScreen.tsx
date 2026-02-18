import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';

type NavigationProp = NativeStackNavigationProp<any>;

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main basket animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -6,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate after 5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Basket Circle */}
      <Animated.View
        style={[
          styles.basketContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Icon name="shopping-bag" size={80} color="#16A34A" />
      </Animated.View>

      {/* Floating Items */}
      <Animated.View
        style={[
          styles.floatingItem,
          styles.apple,
          { transform: [{ translateY: floatAnim }] },
        ]}
      >
        <Icon name="circle" size={24} color="#EF4444" />
      </Animated.View>

      <Animated.View
        style={[
          styles.floatingItem,
          styles.carrot,
          { transform: [{ translateY: floatAnim }] },
        ]}
      >
        <Icon name="triangle" size={24} color="#F97316" />
      </Animated.View>

      <Animated.View
        style={[
          styles.floatingItem,
          styles.milk,
          { transform: [{ translateY: floatAnim }] },
        ]}
      >
        <Icon name="droplet" size={24} color="#60A5FA" />
      </Animated.View>

      {/* App Name */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>Smart Bazzar</Text>
        <Text style={styles.tagline}>
          Fresh groceries, delivered smartly
        </Text>
      </Animated.View>

      {/* Loading Dots */}
      <View style={styles.loadingContainer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF1EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  basketContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    marginBottom: 40,
  },
  floatingItem: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 30,
    elevation: 4,
  },
  apple: {
    top: 180,
    left: 60,
  },
  carrot: {
    top: 180,
    right: 60,
  },
  milk: {
    bottom: 220,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#16A34A',
    borderRadius: 4,
  },
});
