import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import React, {useState, useEffect} from 'react';

//import API
import Api from '../../services/Api';

//import render html
import RenderHtml from 'react-native-render-html';

//import money format
import MoneyFormat from '../../utils/MoneyFormat';

//import component loading
import Loading from '../../components/Loading';

export default function ProductsShowScreen({route}) {
  //destruct slug
  const {slug} = route.params;

  //destruct width dimension
  const {width} = useWindowDimensions();

  //init state loading
  const [loadingProduct, setLoadingProduct] = useState(true);

  //init state
  const [product, setProduct] = useState({});

  //method fetchDetailProduct
  const fetchDetailProduct = async () => {
    //set loading true
    setLoadingProduct(true);

    await Api.get(`/api/public/products/${slug}`).then(response => {
      //assign data to state
      setProduct(response.data.data);

      //set loading false
      setLoadingProduct(false);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDetailProduct"
    fetchDetailProduct();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{padding: 15}}>
        {loadingProduct ? (
          <Loading />
        ) : (
          <>
            <View style={{marginBottom: 90}}>
              <Text style={styles.title}>{product.title}</Text>
              <Image source={{uri: product.image}} style={styles.image} />
              <Text style={styles.owner}>
                <Text style={{fontWeight: 'bold'}}>PEMILIK</Text> :{' '}
                {product.owner}
              </Text>
              <Text style={styles.price}>
                <Text style={{fontWeight: 'bold'}}>HARGA</Text> :{' '}
                {MoneyFormat(product.price)}
              </Text>
              <Text style={styles.address}>
                <Text style={{fontWeight: 'bold'}}>ALAMAT</Text> :{' '}
                {product.address}
              </Text>
              <View style={styles.divider}></View>
              <RenderHtml
                tagsStyles={{
                  p: {
                    color: '#333333',
                    fontSize: 14,
                    margin: 0,
                    padding: 0,
                  },
                  br: {
                    margin: 0,
                    padding: 0,
                  },
                  h1: {
                    color: '#333333',
                    fontSize: 16,
                    margin: 0,
                    padding: 0,
                  },
                  h2: {
                    color: '#333333',
                    fontSize: 16,
                    margin: 0,
                    padding: 0,
                  },
                  h3: {
                    color: '#333333',
                    fontSize: 16,
                    margin: 0,
                    padding: 0,
                  },
                }}
                contentWidth={width}
                source={{html: product.content}}
                enableExperimentalMarginCollapsing={true}
                enableExperimentalGhostLinesPrevention={true}
              />
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.containerFooter}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `whatsapp://send?text=${product.title}&phone=${product.phone}`,
            )
          }>
          <Text style={styles.textButton}>Beli Sekarang</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },

  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },

  owner: {
    fontSize: 14,
    marginBottom: 15,
    color: '#333333',
  },

  price: {
    fontSize: 14,
    marginBottom: 15,
    color: '#333333',
  },

  address: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333333',
  },

  divider: {
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    marginTop: 10,
    marginBottom: 15,
  },

  containerFooter: {
    width: '100%',
    height: 50,
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    bottom: 0,
  },

  textButton: {
    color: '#fff',
    fontSize: 18,
  },
});
