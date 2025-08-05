import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS } from '../theme/theme';
import CustomIcons from '../utils/CustomIcons.js';

const mockData = [
  {
    id: '1',
    name: 'Espresso',
    type: 'Coffee',
    image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Arabica Beans',
    type: 'Beans',
    image:
      'https://images.unsplash.com/photo-1606312615265-88adf2b8820b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Latte',
    type: 'Coffee',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Robusta Beans',
    type: 'Beans',
    image:
      'https://images.unsplash.com/photo-1585128792020-60a27f3c2d30?auto=format&fit=crop&w=800&q=80',
  },
];

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<string[]>(['1', '4']); // Initially favorited items

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderItem = ({ item }: { item: typeof mockData[0] }) => {
    const isFavorited = favorites.includes(item.id);
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <CustomIcons
              name={isFavorited ? 'like' : 'like'}
              size={24}
              color={isFavorited ? COLORS.primaryRedHex || 'red' : 'white'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const favoriteItems = mockData?.filter((item) =>
    favorites.includes(item.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorites</Text>
      {favoriteItems.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet!</Text>
      ) : (
        <FlatList
          data={favoriteItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.primaryDarkGreyHex || '#2C2C2C',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    height: 180,
    width: '100%',
  },
  cardContent: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  type: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
