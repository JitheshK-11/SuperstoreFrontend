import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const categories = [
  {
    id: '1',
    title: 'Fruits & Vegetables',
    subtitle: 'Fresh & Organic',
    image:
      'https://images.unsplash.com/photo-1759508858607-d2cb26efdbcc',
  },
  {
    id: '2',
    title: 'Vegetables',
    subtitle: 'Farm Fresh',
    image:
      'https://images.unsplash.com/photo-1741515044901-58696421d24a',
  },
  {
    id: '3',
    title: 'Dairy & Eggs',
    subtitle: '100+ Products',
    image:
      'https://images.unsplash.com/photo-1771255217872-99fe6c876e45',
  },
  {
    id: '4',
    title: 'Bakery & Bread',
    subtitle: 'Freshly Baked',
    image:
      'https://images.unsplash.com/photo-1767065885755-58ee6202ae74',
  },
  {
    id: '5',
    title: 'Meat & Seafood',
    subtitle: 'Premium Quality',
    image:
      'https://images.unsplash.com/photo-1762088208244-dde4e8b10047',
  },
  {
    id: '6',
    title: 'Household',
    subtitle: 'Home Essentials',
    image:
      'https://images.unsplash.com/photo-1758887262204-a49092d85f15',
  },
];

const filters = [
  'All',
  'Fruits',
  'Vegetables',
  'Dairy',
  'Bakery',
  'Household',
];

export default function CategoriesScreen() {
  const navigation = useNavigation<any>();
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredCategories = categories.filter(cat =>
    cat.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E8F66" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={() => navigation.goBack()}>
            <View style={styles.backBtn}>
              <Text style={{ color: '#1E8F66' }}>←</Text>
            </View>
          </Pressable>

          <View>
            <Text style={styles.headerTitle}>Categories</Text>
            <Text style={styles.headerSub}>
              Browse by category
            </Text>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search categories..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* FILTER CHIPS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 16 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {filters.map(item => (
          <Pressable
            key={item}
            onPress={() => setActiveFilter(item)}
            style={[
              styles.chip,
              activeFilter === item && styles.activeChip,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                activeFilter === item &&
                  styles.activeChipText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* CATEGORY GRID */}
      <FlatList
        data={filteredCategories}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 100,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate('CategoryProducts', {
                category: item.title,
              })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={styles.cardImage}
            />

            <View style={styles.overlay} />

            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>
                {item.title}
              </Text>
              <Text style={styles.cardSubtitle}>
                {item.subtitle}
              </Text>
            </View>
          </Pressable>
        )}
      />
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
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  headerSub: {
    color: '#E6F4F1',
    fontSize: 13,
  },

  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    justifyContent: 'center',
  },

  searchInput: {
    fontSize: 14,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },

  activeChip: {
    backgroundColor: '#1E8F66',
  },

  chipText: {
    color: '#1F2937',
    fontSize: 13,
  },

  activeChipText: {
    color: '#FFFFFF',
  },

  card: {
    width: (width - 48) / 2,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },

  cardImage: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  cardTextContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  cardSubtitle: {
    color: '#E6F4F1',
    fontSize: 11,
  },
});
