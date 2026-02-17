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
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeAreaTop} edges={['top']} />

      <SafeAreaView style={styles.safeAreaBottom} edges={['left', 'right', 'bottom']}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <View style={styles.locationRow}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/marker.png' }}
                style={styles.locationIcon}
              />
              <View>
                <Text style={styles.brandTitle}>Smart Bazzar</Text>
                <Text style={styles.locationText}>
                  B-12, Green Avenue, High Park
                </Text>
              </View>
            </View>

            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
              }}
              style={styles.userAvatar}
            />
          </View>

          {/* Search Visual */}
          <View style={styles.searchBarVisual}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/9ca3af/search--v1.png' }}
              style={styles.searchIcon}
            />
            <Text style={styles.searchText}>Search orders...</Text>
          </View>
        </View>

        {/* Orders List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.sectionTitle}>Recent Orders</Text>

          {orders.map(item => (
            <View key={item.id} style={styles.orderCard}>
              <Image source={{ uri: item.image }} style={styles.orderImage} />

              <View style={styles.orderBody}>
                <Text style={styles.orderTitle} numberOfLines={1}>
                  {item.title}
                </Text>

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

              <Text style={styles.arrow}>›</Text>
            </View>
          ))}
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavWrapper}>
          <View style={styles.bottomNav}>
            
            <Pressable
              style={styles.navItem}
              onPress={() => navigation.navigate('Home')}
            >
              <Image
                source={{
                  uri: 'https://img.icons8.com/fluency-systems-regular/96/6b7280/home.png',
                }}
                style={styles.navIconImage}
              />
              <Text style={styles.navText}>Home</Text>
            </Pressable>

            <Pressable
              style={styles.navItem}
              onPress={() => navigation.navigate('Categories')}
            >
              <Image
                source={{
                  uri: 'https://img.icons8.com/fluency-systems-regular/96/6b7280/categorize.png',
                }}
                style={styles.navIconImage}
              />
              <Text style={styles.navText}>Categories</Text>
            </Pressable>

            <View style={styles.navItem}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/fluency-systems-filled/96/1E8F66/purchase-order.png',
                }}
                style={styles.navIconImage}
              />
              <Text style={[styles.navText, styles.navActive]}>
                Orders
              </Text>
            </View>

            <Pressable
              style={styles.navItem}
              onPress={() => navigation.navigate('Profile')}
            >
              <Image
                source={{
                  uri: 'https://img.icons8.com/fluency-systems-regular/96/6b7280/user-male-circle.png',
                }}
                style={styles.navIconImage}
              />
              <Text style={styles.navText}>Profile</Text>
            </Pressable>

          </View>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1E8F66',
  },

  safeAreaTop: {
    flex: 0,
    backgroundColor: '#1E8F66',
  },

  safeAreaBottom: {
    flex: 1,
    backgroundColor: '#F4F5F3',
  },

  headerContainer: {
    backgroundColor: '#1E8F66',
    paddingHorizontal: 16,
    paddingBottom: 22,
    paddingTop: 8,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },

  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },

  locationText: {
    fontSize: 12,
    color: '#E6F4EF',
    fontWeight: '500',
  },

  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
  },

  searchBarVisual: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },

  searchText: {
    color: '#9ca3af',
    fontSize: 14,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 120,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#177351',
    marginBottom: 16,
  },

  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },

  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 14,
  },

  orderBody: {
    flex: 1,
  },

  orderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },

  orderDate: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },

  orderStatus: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },

  delivered: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },

  outForDelivery: {
    backgroundColor: '#fef9c3',
    color: '#854d0e',
  },

  placed: {
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
  },

  arrow: {
    fontSize: 24,
    color: '#d1d5db',
    marginLeft: 6,
  },

  bottomNavWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: 'center',
  },

  bottomNav: {
    backgroundColor: '#ffffff',
    width: '92%',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
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
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: '500',
  },

  navActive: {
    color: '#1E8F66',
    fontWeight: '700',
  },
});
