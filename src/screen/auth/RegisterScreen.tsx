import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = () => {
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  const translateY = useRef(new Animated.Value(60)).current;

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
      address.trim().length < 5 ||
      pincode.length !== 6,
    [name, mobile,  address, pincode],
  );

  const handleRegister = () => {
    console.log({
      name,
      mobile,
      address,
      pincode,
    });

    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join Smart Bazzar and shop fresh groceries
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[styles.card, { transform: [{ translateY }] }]}
        >
          {/* Full Name */}
          <Text style={styles.label}>FULL NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />

          {/* Mobile */}
          <Text style={styles.label}>MOBILE NUMBER</Text>
          <View style={styles.inputRow}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.inputFlex}
              placeholder="Enter mobile number"
              keyboardType="number-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
            />
          </View>

          {/* Address */}
          <Text style={styles.label}>ADDRESS</Text>
          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="House, Street, Area"
            multiline
            value={address}
            onChangeText={setAddress}
          />

          {/* Pincode */}
          <Text style={styles.label}>PINCODE</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pincode"
            keyboardType="number-pad"
            maxLength={6}
            value={pincode}
            onChangeText={setPincode}
          />

          {/* Button */}
          <Pressable
            style={[styles.button, disabled && styles.buttonDisabled]}
            disabled={disabled}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>
              Create Account
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>
              Already have an account? Login
            </Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    fontSize: 24,
    fontWeight: '700',
    marginTop: 15,
    color: '#1E1E1E',
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 40,
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
    marginBottom: 8,
  },

  input: {
    height: 55,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 15,
    paddingHorizontal: 12,
    height: 55,
    marginBottom: 18,
  },

  inputFlex: {
    flex: 1,
  },

  countryCode: {
    fontWeight: '600',
    marginRight: 10,
  },

  addressInput: {
    height: 80,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: '#4F7D4F',
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  link: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '600',
  },
});
