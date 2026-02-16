import React, { useMemo, useRef, useEffect, useState } from 'react';
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

const RegisterScreen = () => {
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  // slide-in animation (same as login)
  const translateY = useRef(new Animated.Value(80)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const disabled = useMemo(
    () =>
      name.trim().length < 2 ||
      mobile.length !== 10 ||
      !email.includes('@') ||
      address.trim().length < 5 ||
      pincode.length !== 6,
    [name, mobile, email, address, pincode],
  );

  const handleRegister = () => {
    console.log({
      name,
      mobile,
      email,
      address,
      pincode,
    });

    // later backend integration
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.brand}>Smart Bazzar</Text>
      </View>

      {/* Center card */}
      <View style={styles.centerWrapper}>
        <Animated.View
          style={[
            styles.card,
            { transform: [{ translateY }] },
          ]}
        >
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.inputLabel}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputLabel}>Address</Text>
          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="House, Street, Area"
            multiline
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.inputLabel}>Pincode</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pincode"
            keyboardType="number-pad"
            maxLength={6}
            value={pincode}
            onChangeText={setPincode}
          />

          <Pressable
            style={[styles.button, disabled && styles.buttonDisabled]}
            disabled={disabled}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>
              Already have an account? Login
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
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

  inputLabel: {
    color: '#334155',
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 15,
    marginBottom: 14,
    backgroundColor: '#ffffff',
  },

  addressInput: {
    height: 70,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: '#1E8F66',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },

  link: {
    textAlign: 'center',
    marginTop: 12,
    color: '#0284c7',
    fontWeight: '600',
  },
});
