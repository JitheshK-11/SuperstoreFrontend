import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profileMenu = [
  { id: '1', label: 'My Addresses', value: '2 saved' },
  { id: '2', label: 'Payment Methods', value: 'UPI + Card' },
  { id: '3', label: 'Notifications', value: 'Enabled' },
  { id: '4', label: 'Help & Support', value: 'Get help' },
];

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.brand}>Smart Bazzar</Text>
          <Text style={styles.tagline}>Your profile</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency-systems-filled/96/user-male-circle.png' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Jithesh Kumar</Text>
            <Text style={styles.phone}>+91 98765 43210</Text>
          </View>
        </View>

        {profileMenu.map(item => (
          <View key={item.id} style={styles.menuRow}>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuValue}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/home.png' }}
            style={styles.navIconImage}
          />
          <Text style={styles.navText}>Home</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Categories')}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/categorize.png' }}
            style={styles.navIconImage}
          />
          <Text style={styles.navText}>Categories</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Orders')}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/purchase-order.png' }}
            style={styles.navIconImage}
          />
          <Text style={styles.navText}>Orders</Text>
        </Pressable>
        <View style={styles.navItem}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency-systems-filled/96/1E8F66/user-male-circle.png' }}
            style={styles.navIconImage}
          />
          <Text style={[styles.navText, styles.navActive]}>Profile</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#DFF1EC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
  },
  logoImage: {
    width: 54,
    height: 54,
    marginRight: 10,
  },
  brand: {
    fontSize: 24,
    fontWeight: '800',
    color: '#177351',
  },
  tagline: {
    marginTop: 2,
    fontSize: 13,
    color: '#4b5563',
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 140,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5f2ed',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#177351',
  },
  phone: {
    marginTop: 3,
    fontSize: 13,
    color: '#4b5563',
  },
  menuRow: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5f2ed',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  menuValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
  },
  bottomNav: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dceee8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
  },
  navIconImage: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  navActive: {
    color: '#1E8F66',
    fontWeight: '700',
  },
});
