import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';

const { width } = Dimensions.get('window');
const bannerWidth = width - 28;

const categories = [
  { id: '1', label: 'Dairy', icon: 'https://img.icons8.com/color/96/milk-bottle.png' },
  { id: '2', label: 'Vegetables', icon: 'https://img.icons8.com/color/96/broccoli.png' },
  { id: '3', label: 'Fruits', icon: 'https://img.icons8.com/color/96/orange.png' },
  { id: '4', label: 'Stationery', icon: 'https://img.icons8.com/color/96/notebook.png' },
  { id: '5', label: 'Bakery', icon: 'https://img.icons8.com/color/96/bread.png' },
  { id: '6', label: 'Snacks', icon: 'https://img.icons8.com/color/96/chips.png' },
];

const adBanners = [
  {
    id: '1',
    title: 'Fresh Vegetables Up To 30% Off',
    subtitle: 'Farm fresh every morning.',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: '2',
    title: 'Daily Dairy Savings',
    subtitle: 'Milk, paneer and butter deals.',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: '3',
    title: 'Back To School Stationery',
    subtitle: 'Notebooks, pens and more.',
    image:
      'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=70',
  },
];

const deals = [
  {
    id: '1',
    name: 'Fresh Cow Milk 1L',
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=70',
    price: 'Rs 58',
    rating: '4.4',
    reviews: '1,248 ratings',
    description:
      'Farm fresh toned milk with rich taste. Ideal for tea, coffee, and daily household use.',
    seller: 'Smart Dairy Pvt Ltd',
  },
  {
    id: '2',
    name: 'A4 Notebook Pack',
    image:
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=70',
    price: 'Rs 120',
    rating: '4.2',
    reviews: '894 ratings',
    description:
      'Premium ruled notebooks for school and office use. Smooth paper and strong binding.',
    seller: 'StudyMart Sellers',
  },
  {
    id: '3',
    name: 'Fresh Tomatoes 1kg',
    image:
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=70',
    price: 'Rs 42',
    rating: '4.3',
    reviews: '2,105 ratings',
    description:
      'Handpicked farm tomatoes, naturally ripened and perfect for daily cooking.',
    seller: 'Green Basket Farms',
  },
];

const reorder = [
  {
    id: '1',
    title: 'Curd Cups',
    image:
      'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: '2',
    title: 'Colored Pens',
    image:
      'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: '3',
    title: 'Green Spinach',
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=70',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { itemCount } = useCart();
  const bannerRef = useRef<ScrollView>(null);
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeBanner + 1) % adBanners.length;
      bannerRef.current?.scrollTo({ x: nextIndex * bannerWidth, animated: true });
      setActiveBanner(nextIndex);
    }, 2800);

    return () => clearInterval(timer);
  }, [activeBanner]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Pressable style={styles.floatingCart} onPress={() => navigation.navigate('Cart')}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency-systems-filled/96/1E8F66/shopping-cart.png' }}
            style={styles.floatingCartIcon}
          />
          {itemCount > 0 ? (
            <View style={styles.floatingCartBadge}>
              <Text style={styles.floatingCartBadgeText}>{itemCount}</Text>
            </View>
          ) : null}
        </Pressable>

        <View style={styles.header}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.brand}>Smart Bazzar</Text>
            <Text style={styles.tagline}>Fresh daily essentials</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchLabel}>Search in Smart Bazzar</Text>
        </View>

        <View style={styles.categoryWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
            {categories.map(item => (
              <View key={item.id} style={styles.categoryItem}>
                <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
                <Text style={styles.categoryLabel}>{item.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bannerContainer}>
          <ScrollView
            ref={bannerRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={event => {
              const index = Math.round(event.nativeEvent.contentOffset.x / bannerWidth);
              setActiveBanner(index);
            }}
          >
            {adBanners.map(item => (
              <View key={item.id} style={styles.bannerSlide}>
                <Image source={{ uri: item.image }} style={styles.bannerImage} />
                <View style={styles.bannerOverlay}>
                  <Text style={styles.bannerTitle}>{item.title}</Text>
                  <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.dotRow}>
            {adBanners.map((item, index) => (
              <View
                key={item.id}
                style={[styles.dot, activeBanner === index ? styles.dotActive : null]}
              />
            ))}
          </View>
        </View>

        <View style={styles.reorderSection}>
          <Text style={styles.sectionTitle}>Buy Again</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {reorder.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.reorderCard,
                  { marginRight: index === reorder.length - 1 ? 0 : 12 },
                ]}
              >
                <Image source={{ uri: item.image }} style={styles.reorderImage} />
                <Text style={styles.reorderText}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.dealsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {deals.map((item, index) => (
              <View
                key={item.id}
                style={[styles.dealCard, { marginRight: index === deals.length - 1 ? 0 : 12 }]}
              >
                <Image source={{ uri: item.image }} style={styles.dealImage} />
                <Text numberOfLines={1} style={styles.dealName}>{item.name}</Text>
                <Text style={styles.dealPrice}>{item.price}</Text>
                <Pressable
                  style={styles.actionBtn}
                  onPress={() => navigation.navigate('ProductDetails', { product: item, deals })}
                >
                  <Text style={styles.actionText}>Buy Now</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency-systems-filled/96/1E8F66/home.png' }}
            style={styles.navIconImage}
          />
          <Text style={[styles.navText, styles.navActive]}>Home</Text>
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
  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 140,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  floatingCart: {
    position: 'absolute',
    right: 4,
    top: 4,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dceee8',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 40,
  },
  floatingCartIcon: {
    width: 24,
    height: 24,
  },
  floatingCartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  floatingCartBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
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
  searchBox: {
    borderWidth: 1,
    borderColor: '#b9d6cc',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    marginBottom: 14,
  },
  searchLabel: {
    color: '#9ca3af',
    fontSize: 16,
  },
  categoryWrap: {
    marginBottom: 12,
  },
  categoryRow: {
    paddingRight: 8,
  },
  categoryItem: {
    width: 84,
    alignItems: 'center',
    marginRight: 8,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 6,
  },
  categoryLabel: {
    textAlign: 'center',
    fontSize: 13,
    color: '#1f2937',
    fontWeight: '500',
  },
  bannerContainer: {
    marginBottom: 14,
  },
  bannerSlide: {
    width: bannerWidth,
    height: 185,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
  },
  bannerSubtitle: {
    color: '#e5e7eb',
    marginTop: 4,
    fontSize: 15,
    fontWeight: '500',
  },
  dotRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 18,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#cbd5e1',
    marginHorizontal: 3,
  },
  dotActive: {
    width: 26,
    backgroundColor: '#1E8F66',
  },
  reorderSection: {
    backgroundColor: '#EAF7F2',
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#177351',
    marginBottom: 10,
  },
  reorderCard: {
    width: 130,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 8,
  },
  reorderImage: {
    width: '100%',
    height: 78,
    borderRadius: 10,
    marginBottom: 8,
  },
  reorderText: {
    fontSize: 16,
    color: '#4b5563',
    fontWeight: '500',
  },
  dealsSection: {
    marginBottom: 16,
  },
  dealCard: {
    width: 156,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 10,
    elevation: 2,
  },
  dealImage: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    marginBottom: 8,
  },
  dealName: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '600',
  },
  dealPrice: {
    marginTop: 3,
    color: '#111827',
    fontSize: 14,
    fontWeight: '800',
  },
  actionBtn: {
    backgroundColor: '#1E8F66',
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  actionText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
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
