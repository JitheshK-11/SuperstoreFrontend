import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Mock Data
const categories = [
  { id: '1', name: 'Vegetables', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=200&q=80' },
  { id: '2', name: 'Fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=200&q=80' },
  { id: '3', name: 'Dairy', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=200&q=80' },
  { id: '4', name: 'Snacks', image: 'https://images.unsplash.com/photo-1621939514649-28b12e816751?auto=format&fit=crop&w=200&q=80' },
  { id: '5', name: 'Beverages', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=200&q=80' },
  { id: '6', name: 'Care', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=200&q=80' },
];

const bestSellers = [
  {
    id: '1',
    name: 'Fresh Avocado',
    weight: '2 pcs',
    price: 4.99,
    oldPrice: 6.50,
    discount: '23% OFF',
    image: 'https://images.unsplash.com/photo-1523049673856-3dbac6e27720?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'Organic Banana',
    weight: '1 kg',
    price: 1.20,
    oldPrice: 2.00,
    discount: '40% OFF',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a8622e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    name: 'Red Apple',
    weight: '1 kg',
    price: 3.50,
    oldPrice: 4.50,
    discount: '15% OFF',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E8F66" />
      
      {/* Header Section */}
      <SafeAreaView style={styles.headerContainer} edges={['top']}>
        <View style={styles.headerContent}>
          <View style={styles.addressRow}>
            <View>
              <Text style={styles.deliveryLabel}>Delivery in 15 mins</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.addressText} numberOfLines={1}>
                  B-12, Green Avenue, High Park
                </Text>
                <Image
                  source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/expand-arrow--v1.png' }}
                  style={styles.dropdownIcon}
                />
              </View>
            </View>
            <Pressable onPress={() => navigation.navigate('Profile')}>
                <Image
                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80' }}
                style={styles.avatar}
                />
            </Pressable>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/9ca3af/search--v1.png' }}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search groceries, fruits, snacks..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
        {/* Offer Banner */}
        <View style={styles.bannerContainer}>
            <View style={styles.bannerTextContainer}>
                <View style={styles.limitedOfferBadge}>
                    <Text style={styles.limitedOfferText}>LIMITED OFFER</Text>
                </View>
                <Text style={styles.discountText}>50% OFF</Text>
                <Text style={styles.bannerSubText}>on Fresh Fruits</Text>
                <Text style={styles.validityText}>Offer valid till midnight</Text>
            </View>
            <Image 
                source={{uri: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80'}} 
                style={styles.bannerImage}
            />
        </View>

        {/* Categories Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.viewAllText}>View All {'>'}</Text>
        </View>
        
        <View style={styles.categoriesGrid}>
          {categories.map((cat) => (
            <Pressable 
                key={cat.id} 
                style={styles.categoryItem}
                onPress={() => navigation.navigate('Categories')}
            >
              <View style={styles.categoryIconContainer}>
                <Image source={{ uri: cat.image }} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </Pressable>
          ))}
        </View>

        {/* Best Sellers */}
        <View style={styles.sectionHeader}>
            <View style={styles.bestSellerTitleRow}>
                <Image 
                    source={{uri: 'https://img.icons8.com/color/48/fire-element.png'}} 
                    style={styles.fireIcon}
                />
                <Text style={styles.sectionTitle}>Best Sellers</Text>
            </View>
            <View style={styles.timerContainer}>
                <Image 
                    source={{uri: 'https://img.icons8.com/ios/50/666666/clock--v1.png'}} 
                    style={styles.clockIcon}
                />
                <Text style={styles.timerText}>Ends in 04:20:59</Text>
            </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {bestSellers.map((item) => (
            <View key={item.id} style={styles.productCard}>
                <View style={styles.discountBadge}>
                    <Text style={styles.discountBadgeText}>{item.discount}</Text>
                </View>
                <View style={styles.productImageContainer}>
                    <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
                </View>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productWeight}>{item.weight}</Text>
                
                <View style={styles.priceRow}>
                    <Text style={styles.currentPrice}>${item.price.toFixed(2)}</Text>
                    <Text style={styles.oldPrice}>${item.oldPrice.toFixed(2)}</Text>
                </View>
                
                <Pressable style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ Add</Text>
                </Pressable>
            </View>
          ))}
        </ScrollView>
        
        {/* Bottom Padding for Navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Manual Bottom Navigation */}
      <View style={styles.bottomNavWrapper}>
        <View style={styles.bottomNav}>
          <Pressable style={styles.navItem} onPress={() => navigation.navigate('Home')}>
            <Image
              source={{ uri: 'https://img.icons8.com/fluency-systems-filled/96/1E8F66/home.png' }}
              style={[styles.navIcon, { tintColor: '#1E8F66' }]}
            />
            <Text style={[styles.navText, { color: '#1E8F66', fontWeight: '700' }]}>Home</Text>
          </Pressable>
          
          <Pressable style={styles.navItem} onPress={() => navigation.navigate('Categories')}>
            <Image
              source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/6b7280/categorize.png' }}
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Categories</Text>
          </Pressable>
          
          <Pressable style={styles.navItem} onPress={() => navigation.navigate('Cart')}>
            <View style={styles.cartBadgeContainer}>
                <Image
                source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/6b7280/shopping-cart.png' }}
                style={styles.navIcon}
                />
                <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
            </View>
            <Text style={styles.navText}>Cart</Text>
          </Pressable>
          
          <Pressable style={styles.navItem} onPress={() => navigation.navigate('Orders')}>
            <Image
              source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/6b7280/purchase-order.png' }}
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Orders</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F3',
  },
  // Header
  headerContainer: {
    backgroundColor: '#1E8F66', // Primary Green
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    zIndex: 10,
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  deliveryLabel: {
    color: '#A5D6C4', // Lighter shade of green
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 6,
    maxWidth: width * 0.7,
  },
  dropdownIcon: {
    width: 12,
    height: 12,
    tintColor: '#A5D6C4',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3DA57F',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#9CA3AF',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    height: '100%',
  },

  // Main Content
  scrollContent: {
    paddingTop: 20,
  },
  
  // Banner
  bannerContainer: {
    marginHorizontal: 16,
    backgroundColor: '#F25F5C', // Red/Pink accent for offer
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    height: 150,
    overflow: 'hidden',
  },
  bannerTextContainer: {
    flex: 1,
    zIndex: 2,
  },
  limitedOfferBadge: {
    backgroundColor: '#FFD93D',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  limitedOfferText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1F2937',
  },
  discountText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 32,
  },
  bannerSubText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  validityText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
  },
  bannerImage: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
  },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  viewAllText: {
    fontSize: 13,
    color: '#1E8F66', // Primary Green
    fontWeight: '600',
  },

  // Categories Grid
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  categoryItem: {
    width: (width - 32) / 3, // 3 columns
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#E6F4F1', // Very light green bg
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },

  // Best Sellers
  bestSellerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fireIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  clockIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
    tintColor: '#6B7280',
  },
  timerText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
  horizontalList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  productCard: {
    backgroundColor: '#ffffff',
    width: 140,
    borderRadius: 16,
    padding: 10,
    marginRight: 12,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  discountBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 8,
    zIndex: 1,
  },
  discountBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#ffffff',
  },
  productImageContainer: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  productWeight: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937',
    marginRight: 6,
  },
  oldPrice: {
    fontSize: 11,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: '#1E8F66', // Primary Green
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },

  // Bottom Navigation
  bottomNavWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: '92%',
    height: 64,
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    tintColor: '#9CA3AF',
    resizeMode: 'contain',
  },
  navText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  cartBadgeContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '700',
  },
});
