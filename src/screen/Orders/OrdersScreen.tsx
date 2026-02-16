import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const orders = [
  {
    id: '1',
    title: 'Fresh Cow Milk 1L x 2',
    status: 'Delivered',
    date: 'Delivered on Feb 14',
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: '2',
    title: 'A4 Notebook Pack',
    status: 'Out for Delivery',
    date: 'Expected today',
    image:
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: '3',
    title: 'Tomatoes 1kg + Spinach',
    status: 'Placed',
    date: 'Arriving tomorrow',
    image:
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=70',
  },
];

export default function OrdersScreen() {
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
          <Text style={styles.tagline}>Your recent orders</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Orders</Text>
        {orders.map(item => (
          <View key={item.id} style={styles.orderCard}>
            <Image source={{ uri: item.image }} style={styles.orderImage} />
            <View style={styles.orderBody}>
              <Text style={styles.orderTitle}>{item.title}</Text>
              <Text style={styles.orderDate}>{item.date}</Text>
              <Text
                style={[
                  styles.orderStatus,
                  item.status === 'Delivered'
                    ? styles.delivered
                    : item.status === 'Out for Delivery'
                    ? styles.outForDelivery
                    : styles.placed,
                ]}
              >
                {item.status}
              </Text>
            </View>
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
        <View style={styles.navItem}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency-systems-filled/96/1E8F66/purchase-order.png' }}
            style={styles.navIconImage}
          />
          <Text style={[styles.navText, styles.navActive]}>Orders</Text>
        </View>
        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/user-male-circle.png' }}
            style={styles.navIconImage}
          />
          <Text style={styles.navText}>Profile</Text>
        </Pressable>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#177351',
    marginBottom: 12,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5f2ed',
    flexDirection: 'row',
  },
  orderImage: {
    width: 74,
    height: 74,
    borderRadius: 10,
    marginRight: 10,
  },
  orderBody: {
    flex: 1,
    justifyContent: 'center',
  },
  orderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
  },
  orderDate: {
    marginTop: 4,
    fontSize: 12,
    color: '#6b7280',
  },
  orderStatus: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 11,
    fontWeight: '700',
  },
  delivered: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  outForDelivery: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  placed: {
    backgroundColor: '#e0f2fe',
    color: '#075985',
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
