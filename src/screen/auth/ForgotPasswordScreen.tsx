import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your registered email and we will send reset instructions.</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="#94a3b8"
            autoCapitalize="none"
          />

          <Pressable
            style={styles.primaryBtn}
            onPress={() => {
              if (!email.includes('@')) {
                Alert.alert('Enter a valid email');
                return;
              }
              Alert.alert('Reset link sent');
              navigation.navigate('LoginScreen' as never);
            }}
          >
            <Text style={styles.primaryBtnText}>Send Link</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('LoginScreen' as never)}>
            <Text style={styles.link}>Back to Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { color: '#f8fafc', fontSize: 30, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#cbd5e1', marginBottom: 16, lineHeight: 20 },
  card: { backgroundColor: '#f8fafc', borderRadius: 18, padding: 16 },
  label: { color: '#334155', marginBottom: 6, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#0f172a',
    marginBottom: 12,
  },
  primaryBtn: { backgroundColor: '#38bdf8', borderRadius: 12, alignItems: 'center', paddingVertical: 12, marginTop: 6 },
  primaryBtnText: { color: '#082f49', fontSize: 16, fontWeight: '800' },
  link: { textAlign: 'center', marginTop: 12, color: '#0284c7', fontWeight: '600' },
});
