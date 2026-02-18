import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

type OrderStatus = 'delivered' | 'outForDelivery' | 'cancelled';

interface Order {
  id: string;
  orderId: string;
  productName: string;
  date: string;
  status: OrderStatus;
  imageUrl: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderId: 'ORD-2024-001',
    productName: 'Fresh Organic Vegetables',
    date: 'Feb 15, 2026',
    status: 'delivered',
    imageUrl:
      'https://images.unsplash.com/photo-1657288649124-b80bdee3c17e',
  },
  {
    id: '2',
    orderId: 'ORD-2024-002',
    productName: 'Fresh Fruits Basket',
    date: 'Feb 16, 2026',
    status: 'outForDelivery',
    imageUrl:
      'https://images.unsplash.com/photo-1603403887668-a23fbcd4d8be',
  },
  {
    id: '3',
    orderId: 'ORD-2024-004',
    productName: 'Fresh Artisan Bread',
    date: 'Feb 14, 2026',
    status: 'cancelled',
    imageUrl:
      'https://images.unsplash.com/photo-1555932450-31a8aec2adf1',
  },
];

export default function OrdersScreen() {
  const navigation = useNavigation<any>();
  const [activeFilter, setActiveFilter] =
    useState<'all' | OrderStatus>('all');

  const filteredOrders = mockOrders.filter(order =>
    activeFilter === 'all'
      ? true
      : order.status === activeFilter
  );

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return {
          backgroundColor: '#E6F4F1',
          color: '#1E8F66',
        };
      case 'outForDelivery':
        return {
          backgroundColor: '#FEF9C3',
          color: '#854D0E',
        };
      case 'cancelled':
        return {
          backgroundColor: '#FEE2E2',
          color: '#EF4444',
        };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#1E8F66"
      />

      {/* HEADER */}
      <SafeAreaView style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.deliveryText}>
              Delivery in 15 mins
            </Text>
            <Text style={styles.addressText}>
              Home - 123 Green Street
            </Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.avatar}>
              <Text style={{ color: '#1E8F66' }}>JD</Text>
            </View>
          </Pressable>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search for orders..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>
      </SafeAreaView>

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* FILTER CHIPS */}
        <View style={styles.filterRow}>
          {['all', 'delivered', 'outForDelivery', 'cancelled'].map(
            item => (
              <Pressable
                key={item}
                onPress={() =>
                  setActiveFilter(
                    item as 'all' | OrderStatus
                  )
                }
                style={[
                  styles.filterChip,
                  activeFilter === item &&
                    styles.activeChip,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === item &&
                      styles.activeChipText,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            )
          )}
        </View>

        {/* ORDERS */}
        {filteredOrders.map(order => {
          const statusStyle = getStatusStyle(
            order.status
          );

          return (
            <Pressable
              key={order.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate(
                  'OrderDetails',
                  { orderId: order.id }
                )
              }
            >
              <Image
                source={{ uri: order.imageUrl }}
                style={styles.image}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>
                  {order.productName}
                </Text>
                <Text style={styles.subText}>
                  {order.date} • {order.orderId}
                </Text>

                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        statusStyle.backgroundColor,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: statusStyle.color,
                      fontSize: 12,
                      fontWeight: '600',
                    }}
                  >
                    {order.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.arrow}>›</Text>
            </Pressable>
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F3',
  },

  header: {
    backgroundColor: '#1E8F66',
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  deliveryText: {
    color: '#A5D6C4',
    fontSize: 12,
  },

  addressText: {
    color: '#FFF',
    fontWeight: '700',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBar: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    justifyContent: 'center',
  },

  searchInput: {
    fontSize: 14,
  },

  scrollContent: {
    padding: 16,
  },

  filterRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  filterChip: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },

  activeChip: {
    backgroundColor: '#1E8F66',
  },

  filterText: {
    color: '#1F2937',
  },

  activeChipText: {
    color: '#FFF',
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },

  title: {
    fontWeight: '700',
    color: '#1F2937',
  },

  subText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  arrow: {
    fontSize: 20,
    color: '#C4C4C4',
  },
});
