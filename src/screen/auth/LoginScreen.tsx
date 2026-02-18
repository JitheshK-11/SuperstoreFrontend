import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const slideAnim = useRef(new Animated.Value(60)).current;
  const otpRefs = useRef<Array<TextInput | null>>([]);


  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const isMobileValid = mobile.length === 10;
  const isOtpValid = otp.length === 6;

  const handleGetOtp = () => {
    if (!isMobileValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 800);
  };

  const handleVerify = () => {
    if (!isOtpValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Home');
    }, 800);
  };

  const handleGoToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoOuter}>
          <View style={styles.logoInner}>
            <Icon name="shopping-bag" size={28} color="#e2d9d9" />
          </View>
        </View>
        <Text style={styles.title}>Smart Bazzar</Text>
        <Text style={styles.subtitle}>
          Fresh groceries at your doorstep
        </Text>
      </View>

      {/* CARD */}
      <Animated.View
        style={[styles.card, { transform: [{ translateY: slideAnim }] }]}
      >
        {step === 'mobile' ? (
          <>
            <Text style={styles.label}>MOBILE NUMBER</Text>

            <View style={styles.inputRow}>
              <Text style={styles.country}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your mobile number"
                keyboardType="number-pad"
                maxLength={10}
                value={mobile}
                onChangeText={(v) =>
                  setMobile(v.replace(/[^0-9]/g, ''))
                }
              />
            </View>

            <Pressable
              style={[
                styles.button,
                !isMobileValid && styles.disabled,
              ]}
              onPress={handleGetOtp}
              disabled={!isMobileValid || loading}
            >
              {loading ? (
                <Text style={styles.buttonText}>Loading...</Text>
              ) : (
                <>
                  <Text style={styles.buttonText}>Get OTP</Text>
                  <Icon name="arrow-right" size={18} color="#fff" />
                </>
              )}
            </Pressable>

            <Text style={styles.helper}>
              We'll send you a one-time password
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.label}>ENTER OTP</Text>
            <Text style={styles.helper}>
              Sent to +91 {mobile}{' '}
              <Text
                style={styles.change}
                onPress={() => {
                  setStep('mobile');
                  setOtp('');
                }}
              >
                Change
              </Text>
            </Text>

                      <View style={styles.otpRow}>
              {[...Array(6)].map((_, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    otpRefs.current[index] = ref;
                  }}
                  style={[
                    styles.otpBox,
                    otp[index] && styles.otpFilled,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={otp[index] || ''}
                  onChangeText={(value) => {
                    const otpArr = otp.split('');

                    otpArr[index] = value;
                    setOtp(otpArr.join(''));

                    // 👉 Move to next box automatically
                    if (value && index < 5) {
                      otpRefs.current[index + 1]?.focus();
                    }
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    // 👉 Move back on backspace
                    if (
                      nativeEvent.key === 'Backspace' &&
                      !otp[index] &&
                      index > 0
                    ) {
                      otpRefs.current[index - 1]?.focus();
                    }
                  }}
                />
              ))}
            </View>


            <Pressable
              style={[
                styles.button,
                !isOtpValid && styles.disabled,
              ]}
              onPress={handleVerify}
              disabled={!isOtpValid || loading}
            >
              <Text style={styles.buttonText}>
                Verify & Login
              </Text>
              <Icon name="check" size={18} color="#fff" />
            </Pressable>

            <Text style={styles.helper}>
              Didn’t receive code?{' '}
              <Text style={styles.change}>Resend OTP</Text>
            </Text>
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            If you don’t have an account,{' '}
            <Text
              style={styles.register}
              onPress={handleGoToRegister}
            >
              Register here
            </Text>
          </Text>
        </View>
      </Animated.View>

      <Text style={styles.trust}>🔒 Secure & Fast Login</Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F3',
    alignItems: 'center',
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
  },
  logoOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4F7D4F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: 12,
    color: '#2C5530',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 22,
    marginTop: 30,
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    height: 55,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  country: {
    fontWeight: '600',
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    gap: 8,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#4F7D4F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  helper: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 12,
    color: '#6B7280',
  },
  change: {
    color: '#4F7D4F',
    fontWeight: '600',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 18,
  },
  otpFilled: {
    borderColor: '#4F7D4F',
  },
  footer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#6B7280',
  },
  register: {
    color: '#2563EB',
    fontWeight: '600',
  },
  trust: {
    marginTop: 20,
    fontSize: 12,
    color: '#9CA3AF',
  },
});
