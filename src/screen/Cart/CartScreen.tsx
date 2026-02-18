import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const { items, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce(
    (sum: number, item: any) =>
      sum + Number(item.price.replace(/[^0-9.]/g, '')) * item.quantity,
    0
  );

  const deliveryFee = 50;
  const discount = 30;
  const total = subtotal + deliveryFee - discount;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1E8F66" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View>
          <Text style={styles.headerTitle}>My Cart</Text>
          <Text style={styles.headerSub}>Review your items</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySub}>
              Add fresh groceries to get started
            </Text>

            <Pressable
              style={styles.shopBtn}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.shopText}>Start Shopping</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {/* Cart Items */}
            {items.map((item: any) => (
              <View key={item.id} style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />

                <View style={styles.itemBody}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>

                  <View style={styles.qtyRow}>
                    <View style={styles.qtyControls}>
                      <Pressable
                        style={styles.minusBtn}
                        onPress={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Text style={styles.qtyBtnText}>-</Text>
                      </Pressable>

                      <Text style={styles.qtyText}>
                        {item.quantity}
                      </Text>

                      <Pressable
                        style={styles.plusBtn}
                        onPress={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Text style={styles.plusText}>+</Text>
                      </Pressable>
                    </View>

                    <Pressable
                      onPress={() => removeItem(item.id)}
                    >
                      <Text style={styles.removeText}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}

            {/* Order Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.rowBetween}>
                <Text style={styles.grayText}>Subtotal</Text>
                <Text>₹ {subtotal.toFixed(0)}</Text>
              </View>

              <View style={styles.rowBetween}>
                <Text style={styles.grayText}>Delivery Fee</Text>
                <Text>₹ {deliveryFee}</Text>
              </View>

              <View style={styles.rowBetween}>
                <Text style={styles.grayText}>Discount</Text>
                <Text style={styles.discountText}>- ₹ {discount}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.rowBetween}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  ₹ {total.toFixed(0)}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Sticky Checkout */}
      {items.length > 0 && (
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerLabel}>Total Amount</Text>
            <Text style={styles.footerTotal}>
              ₹ {total.toFixed(0)}
            </Text>
          </View>

          <Pressable
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate('Checkout')}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F5F3',
  },

  header: {
    backgroundColor: '#1E8F66',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backBtn: {
    width: 36,
    height: 36,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  backText: {
    fontSize: 20,
    color: '#1E8F66',
    fontWeight: '700',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },

  headerSub: {
    fontSize: 12,
    color: '#E6F4F1',
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 140,
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  emptySub: {
    color: '#6B7280',
    marginTop: 6,
    marginBottom: 20,
  },

  shopBtn: {
    backgroundColor: '#1E8F66',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },

  shopText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 16,
    elevation: 3,
  },

  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },

  itemBody: {
    flex: 1,
  },

  itemName: {
    fontWeight: '700',
    fontSize: 15,
  },

  itemPrice: {
    color: '#1E8F66',
    fontWeight: '700',
    marginTop: 4,
  },

  qtyRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  minusBtn: {
    backgroundColor: '#E6F4F1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  plusBtn: {
    backgroundColor: '#1E8F66',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  qtyBtnText: {
    fontWeight: '700',
    color: '#1E8F66',
  },

  plusText: {
    fontWeight: '700',
    color: '#ffffff',
  },

  qtyText: {
    marginHorizontal: 10,
    fontWeight: '700',
  },

  removeText: {
    color: '#EF4444',
    fontWeight: '600',
  },

  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  grayText: {
    color: '#6B7280',
  },

  discountText: {
    color: '#EF4444',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E8F66',
  },

  footer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
  },

  footerLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  footerTotal: {
    fontSize: 18,
    fontWeight: '800',
  },

  checkoutBtn: {
    backgroundColor: '#1E8F66',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },

  checkoutText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
