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

  // Slide animation (card stays centered)
  const translateY = useRef(new Animated.Value(80)).current;

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
      navigation.navigate('Home'); // make sure Home exists in Stack
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
        <Text style={styles.brand}>Smart Bazzar</Text>
      </View>

      {/* Centered Animated Card */}
      <View style={styles.centerWrapper}>
        <Animated.View
          style={[
            styles.card,
            { transform: [{ translateY: translateY }] },
          ]}
        >
          {/* Mobile Input */}
          <Text style={styles.inputLabel}>Enter mobile number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />

          {!showOtp ? (
            <Pressable
              style={[
                styles.button,
                mobile.length !== 10 && styles.buttonDisabled,
              ]}
              disabled={mobile.length !== 10}
              onPress={handleSendOtp}
            >
              <Text style={styles.buttonText}>Send OTP</Text>
            </Pressable>
          ) : (
            <>
              <Text style={styles.inputLabel}>Enter OTP</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
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
                <Text style={styles.buttonText}>Verify & Login</Text>
              </Pressable>
            </>
          )}

          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>
              Don't have an account? Create Account
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#DFF1EC',
  },

  header: {
    alignItems: 'center',
    marginTop: 30,
  },

  logoImage: {
    width: 72,
    height: 72,
  },

  brand: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '800',
    color: '#177351',
  },

  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    elevation: 6,
  },

  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  inputLabel: {
    color: '#334155',
    fontWeight: '600',
    marginBottom: 8,
  },

  button: {
    backgroundColor: '#1E8F66',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },

  link: {
    textAlign: 'center',
    marginTop: 10,
    color: '#0284c7',
    fontWeight: '600',
  },
});
