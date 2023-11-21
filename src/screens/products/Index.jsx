import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';

import React, {useState, useEffect} from 'react';

//import material icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import api services
import Api from '../../services/Api';

//import component loading
import Loading from '../../components/Loading';

//import component list product
import ListProduct from '../../components/ListProduct';

export default function ProductsIndexScreen() {
  //init state
  const [products, setProducts] = useState([]);
  const [nextPageURL, setNextPageURL] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingLoadMore, setLoadingLoadMore] = useState(false);

  //method fetchDataProducts
  const fetchDataProducts = async () => {
    //set loading true
    setLoadingProducts(true);

    await Api.get('/api/public/products').then(response => {
      //assign data to state
      setProducts(response.data.data.data);

      //assign nextPageURL to state
      setNextPageURL(response.data.data.next_page_url);

      //set loading false
      setLoadingProducts(false);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataProducts"
    fetchDataProducts();
  }, []);

  //method getNextData
  const getNextData = async () => {
    //set loading true
    setLoadingLoadMore(true);

    if (nextPageURL != null) {
      await Api.get(nextPageURL).then(response => {
        //assign data to state
        setProducts([...products, ...response.data.data.data]);

        //assign nextPageURL to state
        setNextPageURL(response.data.data.next_page_url);

        //set loading false
        setLoadingLoadMore(false);
      });
    } else {
      // no data next page
      setLoadingLoadMore(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={{padding: 15}}>
        {/* posts / berita */}
        <View style={styles.labelContainer}>
          <MaterialCommunityIcons
            name="basket"
            style={styles.labelIcon}
            size={20}
          />
          <Text style={styles.labelText}>PRODUK</Text>
        </View>
        <View>
          {loadingProducts ? (
            <Loading />
          ) : (
            <>
              <FlatList
                style={styles.container}
                numColumns={2}
                data={products}
                renderItem={({item, index, separators}) => (
                  <ListProduct data={item} index={index} />
                )}
                eyExtractor={item => item.id}
                scrollEnabled={false}
                onEndReached={getNextData}
                onEndReachedThreshold={0.5}
              />
              {loadingLoadMore ? <Loading /> : null}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    marginTop: 5,
    flexDirection: 'row',
  },

  labelIcon: {
    marginRight: 5,
    color: '#333333',
  },

  labelText: {
    color: '#333333',
    fontWeight: 'bold',
  },

  container: {
    marginTop: 10,
    flex: 1,
  },
});
