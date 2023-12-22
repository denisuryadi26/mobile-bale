import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Api from '../../services/Api';
import Loading from '../../components/Loading';
import ListPhoto from '../../components/ListPhoto';

export default function PhotosScreen() {
  const [photos, setPhotos] = useState([]);
  const [nextPageURL, setNextPageURL] = useState(null);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [loadingLoadMore, setLoadingLoadMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDataPhotos = async () => {
    setLoadingPhotos(true);
    await Api.get('/api/public/photos').then(response => {
      setPhotos(response.data.data.data);
      setNextPageURL(response.data.data.next_page_url);
      setLoadingPhotos(false);
    });
  };

  useEffect(() => {
    fetchDataPhotos();
  }, []);

  const getNextData = async () => {
    setLoadingLoadMore(true);

    if (nextPageURL != null) {
      await Api.get(nextPageURL).then(response => {
        setPhotos([...photos, ...response.data.data.data]);
        setNextPageURL(response.data.data.next_page_url);
        setLoadingLoadMore(false);
      });
    } else {
      setLoadingLoadMore(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDataPhotos();
    setRefreshing(false);
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{padding: 15}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View style={styles.labelContainer}>
          <MaterialCommunityIcons
            name="image-multiple"
            style={styles.labelIcon}
            size={20}
          />
          <Text style={styles.labelText}>GALERI FOTO</Text>
        </View>
        <View>
          {loadingPhotos ? (
            <Loading />
          ) : (
            <>
              <FlatList
                style={styles.container}
                numColumns={2}
                data={photos}
                renderItem={({item, index, separators}) => (
                  <ListPhoto data={item} index={index} />
                )}
                keyExtractor={item => item.id}
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
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
  },
});
