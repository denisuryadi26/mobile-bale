import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';

import React, {useState, useEffect} from 'react';

//import api services
import Api from '../../services/Api';

//import component loading
import Loading from '../../components/Loading';

//import component list page
import ListPage from '../../components/ListPage';

export default function PagesIndexScreen() {
  //init state
  const [pages, setPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);

  //method fetchDataPages
  const fetchDataPages = async () => {
    //set loading true
    setLoadingPages(true);

    await Api.get('/api/public/pages').then(response => {
      //assign data to state
      setPages(response.data.data);

      //set loading false
      setLoadingPages(false);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataPages"
    fetchDataPages();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={{padding: 15}}>
        <View>
          {loadingPages ? (
            <Loading />
          ) : (
            <FlatList
              style={styles.container}
              data={pages}
              renderItem={({item, index, separators}) => (
                <ListPage data={item} index={index} />
              )}
              eyExtractor={item => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
  },
});
