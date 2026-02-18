import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
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

  const similarProducts = deals
    .filter(item => item.id !== product?.id)
    .slice(0, 3);

  if (!product) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E8F66" />

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Product Details</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* PRODUCT CARD */}
        <View style={styles.card}>
          <Image source={{ uri: product.image }} style={styles.image} />

          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{product.price}</Text>

            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>
                ⭐ {product.rating ?? '4.8'}
              </Text>
            </View>
          </View>

          <Text style={styles.reviewText}>
            {product.reviews ?? 'Based on 324 reviews'}
          </Text>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Product Description
          </Text>
          <Text style={styles.sectionText}>
            {product.description ??
              'Premium quality organic product delivered fresh from trusted farms.'}
          </Text>
        </View>

        {/* SELLER DETAILS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Seller Details
          </Text>

          <Text style={styles.sectionText}>
            Sold by: {product.seller ?? 'Green Fields Organic Farm'}
          </Text>
          <Text style={styles.sectionText}>
            Delivery within 2-3 hours
          </Text>
          <Text style={styles.sectionText}>
            7-day return policy available
          </Text>
        </View>

        {/* SIMILAR PRODUCTS */}
        {similarProducts.length > 0 && (
          <View style={styles.similarContainer}>
            <View style={styles.similarHeader}>
              <Text style={styles.sectionTitle}>
                Similar Products
              </Text>
              <Pressable>
                <Text style={styles.seeAllText}>
                  See All ›
                </Text>
              </Pressable>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {similarProducts.map(item => (
                <Pressable
                  key={item.id}
                  style={styles.similarCard}
                  onPress={() =>
                    navigation.push(
                      'ProductDetails',
                      { product: item, deals }
                    )
                  }
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.similarImage}
                  />
                  <Text
                    numberOfLines={1}
                    style={styles.similarName}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.similarPrice}>
                    {item.price}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* FOOTER BUTTONS */}
      <View style={styles.footer}>
        <Pressable
          style={styles.cartButton}
          onPress={() => {
            addItem(product);
            navigation.navigate('Cart');
          }}
        >
          <Text style={styles.cartText}>Add to Cart</Text>
        </Pressable>

        <Pressable
          style={styles.buyButton}
          onPress={() =>
            navigation.navigate('Checkout', {
              product,
            })
          }
        >
          <Text style={styles.buyText}>Buy Now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
    paddingVertical: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  backArrow: {
    fontSize: 18,
    color: '#1E8F66',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  price: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E8F66',
  },

  ratingBadge: {
    backgroundColor: '#E6F4F1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  ratingText: {
    color: '#1F2937',
    fontWeight: '600',
  },

  reviewText: {
    marginTop: 6,
    color: '#6B7280',
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },

  sectionText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },

  similarContainer: {
    backgroundColor: '#E6F4F1',
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },

  similarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  seeAllText: {
    color: '#1E8F66',
    fontWeight: '600',
  },

  similarCard: {
    backgroundColor: '#FFFFFF',
    width: 130,
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
    elevation: 2,
  },

  similarImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 6,
  },

  similarName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },

  similarPrice: {
    color: '#1E8F66',
    fontWeight: '700',
    marginTop: 4,
  },

  footer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    flexDirection: 'row',
  },

  cartButton: {
    flex: 1,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#1E8F66',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  cartText: {
    color: '#1E8F66',
    fontWeight: '700',
  },

  buyButton: {
    flex: 1,
    backgroundColor: '#1E8F66',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  buyText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
