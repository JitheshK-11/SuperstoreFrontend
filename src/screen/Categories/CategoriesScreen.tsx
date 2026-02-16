import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categoryBlocks = [
  {
    id: '1',
    title: 'Dairy Items',
    subtitle: 'Milk, curd, paneer',
    image:
      'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: '2',
    title: 'Vegetables',
    subtitle: 'Farm fresh greens',
    image:
      'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: '3',
    title: 'Stationery',
    subtitle: 'Pens, notebooks, files',
    image:
      'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: '4',
    title: 'Fruits',
    subtitle: 'Seasonal and fresh',
    image:
      'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: '5',
    title: 'Bakery',
    subtitle: 'Bread and snacks',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: '6',
    title: 'Household',
    subtitle: 'Daily cleaning needs',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=70',
  },
];

export default function CategoriesScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.brand}>Smart Bazzar</Text>
          <Text style={styles.tagline}>Browse by category</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>All Categories</Text>
        <View style={styles.grid}>
          {categoryBlocks.map(item => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/home.png' }}
            style={styles.navIconImage}
          />
          <Text style={styles.navText}>Home</Text>
        </Pressable>
        <View style={styles.navItem}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency-systems-filled/96/1E8F66/categorize.png' }}
            style={styles.navIconImage}
          />
          <Text style={[styles.navText, styles.navActive]}>Categories</Text>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
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
  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 140,
    paddingTop: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#177351',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e5f2ed',
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
  },
  cardSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: '#6b7280',
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
