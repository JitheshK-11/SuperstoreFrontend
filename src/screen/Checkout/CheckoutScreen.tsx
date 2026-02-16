import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';

type ProductType = {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity?: number;
};

const addresses = [
  {
    id: '1',
    label: 'Home',
    detail: '14/33, near vaibhav nilaya, Bengaluru - 560037',
  },
  {
    id: '2',
    label: 'Work',
    detail: 'IT Park Road, Whitefield, Bengaluru - 560066',
  },
];

const paymentModes = ['UPI', 'Cash on Delivery', 'Credit / Debit Card'];

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { items } = useCart();
  const singleProduct: ProductType | undefined = route.params?.product;

  const [selectedAddress, setSelectedAddress] = useState('1');
  const [selectedPayment, setSelectedPayment] = useState('UPI');

  const checkoutItems: ProductType[] = useMemo(() => {
    if (singleProduct) {
      return [{ ...singleProduct, quantity: 1 }];
    }
    return items;
  }, [items, singleProduct]);

  const itemCount = checkoutItems.reduce((sum, item) => sum + (item.quantity ?? 1), 0);

  const subtotal = checkoutItems.reduce((sum, item) => {
    const value = Number(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + value * (item.quantity ?? 1);
  }, 0);
  const deliveryFee = subtotal > 0 ? 20 : 0;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          {addresses.map(addr => (
            <Pressable
              key={addr.id}
              style={[
                styles.choiceRow,
                selectedAddress === addr.id ? styles.choiceRowActive : null,
              ]}
              onPress={() => setSelectedAddress(addr.id)}
            >
              <Text style={styles.choiceTitle}>{addr.label}</Text>
              <Text style={styles.choiceDetail}>{addr.detail}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentModes.map(mode => (
            <Pressable
              key={mode}
              style={[
                styles.paymentRow,
                selectedPayment === mode ? styles.choiceRowActive : null,
              ]}
              onPress={() => setSelectedPayment(mode)}
            >
              <Text style={styles.paymentText}>{mode}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {checkoutItems.length === 0 ? (
            <Text style={styles.emptyText}>No items selected.</Text>
          ) : (
            checkoutItems.map(item => (
              <View key={item.id} style={styles.summaryRow}>
                <Text style={styles.summaryName}>{item.name}</Text>
                <Text style={styles.summaryQty}>x{item.quantity ?? 1}</Text>
                <Text style={styles.summaryPrice}>{item.price}</Text>
              </View>
            ))
          )}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Items ({itemCount})</Text>
            <Text style={styles.totalValue}>Rs {subtotal.toFixed(0)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery Fee</Text>
            <Text style={styles.totalValue}>Rs {deliveryFee.toFixed(0)}</Text>
          </View>
          <View style={[styles.totalRow, styles.totalStrongRow]}>
            <Text style={styles.totalStrongLabel}>Total Payable</Text>
            <Text style={styles.totalStrongValue}>Rs {total.toFixed(0)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.payLabel}>Payable Amount</Text>
          <Text style={styles.payValue}>Rs {total.toFixed(0)}</Text>
        </View>
        <Pressable style={styles.placeBtn}>
          <Text style={styles.placeBtnText}>Place Order</Text>
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
    paddingBottom: 104,
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
    marginBottom: 8,
  },
  choiceRow: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  choiceRowActive: {
    borderColor: '#1E8F66',
    backgroundColor: '#f0fdf4',
  },
  choiceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
  },
  choiceDetail: {
    marginTop: 4,
    color: '#6b7280',
    fontSize: 12,
  },
  paymentRow: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  emptyText: {
    color: '#6b7280',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryName: {
    flex: 1,
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
  },
  summaryQty: {
    width: 28,
    textAlign: 'center',
    color: '#6b7280',
  },
  summaryPrice: {
    width: 70,
    textAlign: 'right',
    color: '#1f2937',
    fontWeight: '700',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  totalLabel: {
    color: '#6b7280',
  },
  totalValue: {
    color: '#374151',
    fontWeight: '700',
  },
  totalStrongRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalStrongLabel: {
    color: '#111827',
    fontWeight: '800',
    fontSize: 16,
  },
  totalStrongValue: {
    color: '#111827',
    fontWeight: '800',
    fontSize: 16,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payLabel: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
  },
  payValue: {
    color: '#1f2937',
    fontSize: 18,
    fontWeight: '800',
  },
  placeBtn: {
    backgroundColor: '#1E8F66',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  placeBtnText: {
    color: '#ffffff',
    fontWeight: '800',
  },
});
