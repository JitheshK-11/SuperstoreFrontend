import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const [mobile, setMobile] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');

  const translateY = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setShowOtp(true);
    }
  };

  const handleLogin = () => {
    if (otp.length === 6) {
      navigation.navigate('Home' as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Smart Bazzar</Text>
        <Text style={styles.subtitle}>
          Fresh groceries at your doorstep
        </Text>
      </View>

      {/* Animated Card */}
      <Animated.View
        style={[styles.card, { transform: [{ translateY }] }]}
      >
        <Text style={styles.label}>MOBILE NUMBER</Text>

        {/* Input Row */}
        <View style={styles.inputRow}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        {!showOtp ? (
          <Pressable
            style={[
              styles.button,
              mobile.length !== 10 && styles.buttonDisabled,
            ]}
            disabled={mobile.length !== 10}
            onPress={handleSendOtp}
          >
            <Text style={styles.buttonText}>Get OTP  ›</Text>
          </Pressable>
        ) : (
          <>
            <Text style={styles.label}>ENTER OTP</Text>

            <TextInput
              style={styles.otpInput}
              placeholder="Enter 6 digit OTP"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
            />

            <Pressable
              style={[
                styles.button,
                otp.length !== 6 && styles.buttonDisabled,
              ]}
              disabled={otp.length !== 6}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>
                Verify & Login
              </Text>
            </Pressable>
          </>
        )}

        <Text style={styles.helperText}>
          We'll send you a one-time password
        </Text>

        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>
            If you don't have account, Register here
          </Text>
        </Pressable>
      </Animated.View>

      {/* Bottom Illustration */}
      <View style={styles.bottomImageContainer}>
        <Image
          source={require('../../assets/grocery.png')} // add grocery image in assets
          style={styles.bottomImage}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F5F3',
  },

  header: {
    alignItems: 'center',
    marginTop: 40,
  },

  logoCircle: {
    backgroundColor: '#4F7D4F',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: 15,
    color: '#1E1E1E',
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },

  card: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    elevation: 6,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 10,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 15,
    paddingHorizontal: 12,
    height: 55,
    marginBottom: 20,
  },

  countryCode: {
    fontWeight: '600',
    marginRight: 10,
  },

  input: {
    flex: 1,
  },

  otpInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#4F7D4F',
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  helperText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6B7280',
  },

  link: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '600',
  },

  bottomImageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },

  bottomImage: {
    width: '85%',
    height: 160,
  },
});
