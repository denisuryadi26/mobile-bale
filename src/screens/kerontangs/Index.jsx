import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  TextInput,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Api from '../../services/Api';
import Loading from '../../components/Loading';
import ListPost from '../../components/ListKerontang';

export default function PostsIndexScreen() {
  const [kerontangs, setPosts] = useState([]);
  const [nextPageURL, setNextPageURL] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingLoadMore, setLoadingLoadMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false); // State for refresh control
  const handleSearchSubmit = () => {
    handleSearch();
  };
  const fetchDataPosts = async () => {
    setLoadingPosts(true);
    await Api.get('/api/public/kerontangs/all').then(response => {
      setPosts(response.data.data);
      setNextPageURL(response.data.data.next_page_url);
      setLoadingPosts(false);
    });
  };

  const getNextData = async () => {
    setLoadingLoadMore(true);
    if (nextPageURL != null) {
      await Api.get(nextPageURL).then(response => {
        setPosts([...kerontangs, ...response.data.data.data]);
        setNextPageURL(response.data.data.next_page_url);
        setLoadingLoadMore(false);
      });
    } else {
      setLoadingLoadMore(false);
    }
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  const handleSearch = () => {
    const filteredKerontangs = kerontangs.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setPosts(filteredKerontangs);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDataPosts();
    setRefreshing(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchDataPosts(); // Fetch initial data after clearing search
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{padding: 15, marginBottom: 110}} // Add marginBottom here
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View style={styles.searchBarContainer}>
          {/* Search bar */}
          <TextInput
            style={styles.searchBar}
            placeholder="Cari Kerontang..."
            placeholderTextColor="black"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            onSubmitEditing={handleSearchSubmit} // Call handleSearchSubmit on submit
          />

          {/* Clear button */}
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearSearch}>
              <MaterialCommunityIcons
                name="close"
                style={styles.clearIcon}
                size={20}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Submit button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSearchSubmit}>
          <Text style={styles.submitButtonText}>Cari</Text>
        </TouchableOpacity>

        {/* Refresh button */}
        {/* <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity> */}

        <View style={styles.labelContainer}>
          <MaterialCommunityIcons
            name="newspaper-variant-multiple"
            style={styles.labelIcon}
            size={20}
          />
          <Text style={styles.labelText}>KERONTANG SANGKAKALA</Text>
        </View>
        <View>
          {loadingPosts ? (
            <Loading />
          ) : (
            <>
              <FlatList
                style={styles.container}
                data={kerontangs}
                renderItem={({item, index, separators}) => (
                  <ListPost data={item} index={index} />
                )}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                onEndReached={getNextData}
                onEndReachedThreshold={0.5}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                  />
                }
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

  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchBar: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    color: 'black', // Add this line to set the text color to black
  },

  clearButton: {
    padding: 10,
  },

  clearIcon: {
    color: '#333333',
  },

  refreshButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },

  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  submitButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },

  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
