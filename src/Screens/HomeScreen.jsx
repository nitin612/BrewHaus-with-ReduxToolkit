import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../theme/theme.ts';
import Header from '../Components/Header.tsx';
import CustomIcons from '../utils/CustomIcons.js';
import { fetchBeans, fetchCoffee } from '../features/counter/beanSlice';
import { useSelector, useDispatch } from 'react-redux';
import BeansCard from '../Components/BeansCard.jsx';
import { setSearchText } from '../features/counter/beanSlice';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { beansList, coffeeList, loading, error, searchText } = useSelector(
    state => state.beans,
  );

  console.log(beansList, 'asdfhjkl;');
  useEffect(() => {
    dispatch(fetchBeans());
    dispatch(fetchCoffee());
  }, [dispatch]);

  // const filteredCoffee = coffeeList.filter(coffee => {
  //   return coffee.name.toLowerCase().includes(searchText.toLowerCase());
  // });

  const filteredCoffee = (coffeeList || []).filter(coffee => {
    return coffee.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <Header tittle="homeScreen" />
      <View style={styles.subTittleViewe}>
        <Text style={styles.tittleSub}>Find the Best {'\n'}coffee for you</Text>
      </View>
      <View style={styles.searchBar}>
        <CustomIcons
          name="search"
          size={20}
          color={
            searchText.length > 0
              ? COLORS.primaryOrangeHex
              : COLORS.primaryLightGreyHex
          }
        />
        <TextInput
          placeholder="Find your Coffee..."
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.searchTxt}
          value={searchText}
          onChangeText={text => dispatch(setSearchText(text))}
        ></TextInput>
      </View>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primaryOrangeHex} />
        ) : (
          <FlatList
            horizontal
            data={filteredCoffee}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailsScreen', { item })}
              >
                <BeansCard beans={item} />
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View style={{ padding: 20 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>
                  NO Data Found
                </Text>
              </View>
            }
          />
        )}
        <FlatList
          horizontal
          data={beansList}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailsScreen', { item })}
            >
              <BeansCard beans={item} />
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ padding: 20 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>
                NO Data Found
              </Text>
            </View>
          }
        />
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  subTittleViewe: {},
  tittleSub: {
    fontFamily: 'Poppins-ExtraBold',
    color: COLORS.primaryWhiteHex,
    fontSize: 28,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  searchBar: {
    borderRadius: 14,
    borderColor: COLORS.primaryWhiteHex,
    marginHorizontal: 15,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  searchTxt: {
    flex: 1,
    color: COLORS.primaryWhiteHex,
    fontWeight: 500,
    fontSize: 16,
  },
  CoffeeContainer: {
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    margin: 10,
  },
  CoffeeData: {
    color: COLORS.primaryWhiteHex,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

// const [coffeeList, setCoffeeList] = useState([]);
// const [loading, setLoading] = useState(true);
// const [searchText, setSearchText] = useState('');
// const fetchCoffeeData = async () => {
//   try {
//     const data = await getCoffeeData();
//     setCoffeeList(data);
//     setLoading(false);
//   } catch (err) {
//     console.log('error occured', err);
//   }
// };
// useEffect(() => {
//   fetchCoffeeData();
// }, []);
