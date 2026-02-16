import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const { items, itemCount } = useCart();

  const total = items.reduce((sum, item) => {
    const value = Number(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + value * item.quantity;
  }, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {items.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>Add products to see them here.</Text>
          </View>
        ) : (
          items.map(item => (
            <View key={item.id} style={styles.itemCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemBody}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Items: {itemCount}</Text>
          <Text style={styles.footerTotal}>Total: Rs {total.toFixed(0)}</Text>
        </View>
        <Pressable style={styles.checkoutBtn} onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.checkoutText}>Checkout</Text>
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
    fontSize: 24,
    color: '#177351',
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 110,
  },
  emptyCard: {
    marginTop: 40,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5f2ed',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  emptySubtitle: {
    marginTop: 4,
    color: '#6b7280',
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5f2ed',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  itemImage: {
    width: 76,
    height: 76,
    borderRadius: 10,
    marginRight: 10,
  },
  itemBody: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
  },
  itemPrice: {
    marginTop: 4,
    fontSize: 14,
    color: '#177351',
    fontWeight: '700',
  },
  itemQty: {
    marginTop: 3,
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#dceee8',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLabel: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
  },
  footerTotal: {
    color: '#1f2937',
    fontSize: 18,
    fontWeight: '800',
  },
  checkoutBtn: {
    backgroundColor: '#1E8F66',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  checkoutText: {
    color: '#ffffff',
    fontWeight: '800',
  },
});
