import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';

type ProductType = {
  id: string;
  name: string;
  image: string;
  price: string;
  rating?: string;
  reviews?: string;
  description?: string;
  seller?: string;
};

export default function ProductDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { addItem } = useCart();
  const product: ProductType = route.params?.product;
  const deals: ProductType[] = route.params?.deals ?? [];

  const similarProducts = deals.filter(item => item.id !== product?.id).slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Product Details</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.productCard}>
          <Image source={{ uri: product?.image }} style={styles.productImage} />
          <Text style={styles.productName}>{product?.name}</Text>
          <Text style={styles.productPrice}>{product?.price}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingBadge}>{product?.rating ?? '4.0'} Star</Text>
            <Text style={styles.ratingText}>{product?.reviews ?? 'No ratings yet'}</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Product Description</Text>
          <Text style={styles.sectionBody}>
            {product?.description ??
              'Quality daily-use product available at Smart Bazzar with reliable packaging and fast delivery.'}
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Seller Details</Text>
          <Text style={styles.sectionBody}>Sold by: {product?.seller ?? 'Smart Bazzar Verified Seller'}</Text>
          <Text style={styles.sectionBody}>Delivery: Same day / Next day available</Text>
          <Text style={styles.sectionBody}>Return Policy: 7 days return for eligible products</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Similar Products</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {similarProducts.map(item => (
              <View key={item.id} style={styles.similarCard}>
                <Image source={{ uri: item.image }} style={styles.similarImage} />
                <Text numberOfLines={1} style={styles.similarName}>{item.name}</Text>
                <Text style={styles.similarPrice}>{item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.footerBar}>
        <Pressable
          style={styles.cartBtn}
          onPress={() => {
            if (product) {
              addItem(product);
            }
            navigation.navigate('Cart');
          }}
        >
          <Text style={styles.cartText}>Add to Cart</Text>
        </Pressable>
        <Pressable
          style={styles.buyBtn}
          onPress={() => navigation.navigate('Checkout', { product })}
        >
          <Text style={styles.buyText}>Buy Now</Text>
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
  backBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dceee8',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginRight: 10,
  },
  backText: {
    color: '#177351',
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 21,
    color: '#177351',
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 96,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5f2ed',
    padding: 12,
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  productPrice: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  ratingRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadge: {
    backgroundColor: '#1E8F66',
    color: '#ffffff',
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 8,
  },
  ratingText: {
    color: '#6b7280',
    fontSize: 13,
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5f2ed',
    padding: 12,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#177351',
    marginBottom: 6,
  },
  sectionBody: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 2,
  },
  similarCard: {
    width: 132,
    backgroundColor: '#f8fbfa',
    borderRadius: 10,
    padding: 8,
    marginRight: 10,
  },
  similarImage: {
    width: '100%',
    height: 78,
    borderRadius: 8,
    marginBottom: 6,
  },
  similarName: {
    color: '#1f2937',
    fontSize: 12,
    fontWeight: '600',
  },
  similarPrice: {
    marginTop: 2,
    color: '#177351',
    fontWeight: '700',
    fontSize: 13,
  },
  footerBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
    flexDirection: 'row',
  },
  cartBtn: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#ffffff',
    borderColor: '#1E8F66',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cartText: {
    color: '#1E8F66',
    fontWeight: '800',
  },
  buyBtn: {
    flex: 1,
    backgroundColor: '#1E8F66',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buyText: {
    color: '#ffffff',
    fontWeight: '800',
  },
});
