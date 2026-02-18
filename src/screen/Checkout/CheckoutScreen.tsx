import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const { items, clearCart } = useCart();

  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = useMemo(() => {
    return items.reduce((sum: number, item: any) => {
      const value = Number(item.price.replace(/[^0-9.]/g, '')) || 0;
      return sum + value * item.quantity;
    }, 0);
  }, [items]);

  const deliveryFee = subtotal > 0 ? 25 : 0;
  const total = subtotal + deliveryFee - discount;

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SAVE50') {
      setDiscount(50);
      Alert.alert('Promo Applied', '₹50 discount applied!');
    } else {
      setDiscount(0);
      Alert.alert('Invalid Code');
    }
  };

  const placeOrder = () => {
    if (items.length === 0) {
      Alert.alert('Cart is empty');
      return;
    }

    if (!selectedAddress) {
      Alert.alert('Select delivery address');
      return;
    }

    if (!selectedPayment) {
      Alert.alert('Select payment method');
      return;
    }

    clearCart();
    Alert.alert('Success', 'Order placed successfully!');
    navigation.replace('Orders');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1E8F66" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <View>
          <Text style={styles.headerTitle}>Checkout</Text>
          <Text style={styles.headerSub}>Confirm your order details</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Address */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>

          {['home', 'work'].map(type => (
            <Pressable
              key={type}
              onPress={() => setSelectedAddress(type)}
              style={[
                styles.optionBox,
                selectedAddress === type && styles.optionActive,
              ]}
            >
              <Text style={styles.optionTitle}>
                {type === 'home' ? 'Home' : 'Work'}
              </Text>
              <Text style={styles.optionDetail}>
                {type === 'home'
                  ? '123 Green Valley Road'
                  : '456 Business Park Avenue'}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Payment */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          {['upi', 'card', 'cod'].map(mode => (
            <Pressable
              key={mode}
              onPress={() => setSelectedPayment(mode)}
              style={[
                styles.optionBox,
                selectedPayment === mode && styles.optionActive,
              ]}
            >
              <Text style={styles.optionTitle}>
                {mode === 'upi'
                  ? 'UPI'
                  : mode === 'card'
                  ? 'Credit / Debit Card'
                  : 'Cash on Delivery'}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Promo Code */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Apply Coupon</Text>

          <View style={styles.promoRow}>
            <TextInput
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
              style={styles.promoInput}
            />
            <Pressable style={styles.applyBtn} onPress={applyPromo}>
              <Text style={styles.applyText}>Apply</Text>
            </Pressable>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          {items.map((item: any) => (
            <View key={item.id} style={styles.summaryRow}>
              <Text style={styles.summaryName}>
                {item.name} x{item.quantity}
              </Text>
              <Text style={styles.summaryPrice}>{item.price}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <Text>Subtotal</Text>
            <Text>₹ {subtotal.toFixed(0)}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text>Delivery Fee</Text>
            <Text>₹ {deliveryFee}</Text>
          </View>

          {discount > 0 && (
            <View style={styles.rowBetween}>
              <Text>Discount</Text>
              <Text style={{ color: 'red' }}>- ₹ {discount}</Text>
            </View>
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ₹ {total.toFixed(0)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total Payable</Text>
          <Text style={styles.footerTotal}>
            ₹ {total.toFixed(0)}
          </Text>
        </View>

        <Pressable style={styles.placeBtn} onPress={placeOrder}>
          <Text style={styles.placeText}>Place Order</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F5F3' },

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
    fontWeight: '700',
    color: '#1E8F66',
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
    paddingBottom: 120,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 16,
  },

  optionBox: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },

  optionActive: {
    borderColor: '#1E8F66',
    backgroundColor: '#E6F4F1',
  },

  optionTitle: {
    fontWeight: '600',
  },

  optionDetail: {
    fontSize: 12,
    color: '#6B7280',
  },

  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  promoInput: {
    flex: 1,
    backgroundColor: '#F4F5F3',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  applyBtn: {
    marginLeft: 8,
    backgroundColor: '#1E8F66',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  applyText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  summaryName: {
    color: '#374151',
  },

  summaryPrice: {
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  totalRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalLabel: {
    fontWeight: '800',
    fontSize: 16,
  },

  totalValue: {
    fontWeight: '800',
    fontSize: 18,
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
    fontSize: 20,
    fontWeight: '800',
  },

  placeBtn: {
    backgroundColor: '#1E8F66',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
  },

  placeText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
