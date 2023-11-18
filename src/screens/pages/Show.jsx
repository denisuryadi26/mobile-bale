import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import React, {useState, useEffect} from 'react';

//import API
import Api from '../../services/Api';

//import material icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//import render html
import RenderHtml from 'react-native-render-html';

//import momen js
import moment from 'moment';
import 'moment/locale/id';

//import component loading
import Loading from '../../components/Loading';

export default function PagesShowScreen({route}) {
  //destruct slug
  const {slug} = route.params;

  //destruct width dimension
  const {width} = useWindowDimensions();

  //init state loading
  const [loadingPage, setLoadingPage] = useState(true);

  //init state
  const [page, setPage] = useState({});

  //method fetchDetailPage
  const fetchDetailPage = async () => {
    //set loading true
    setLoadingPage(true);

    await Api.get(`/api/public/pages/${slug}`).then(response => {
      //assign data to state
      setPage(response.data.data);

      //set loading false
      setLoadingPage(false);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDetailPage"
    fetchDetailPage();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={{padding: 15}}>
        {loadingPage ? (
          <Loading />
        ) : (
          <View>
            <Text style={styles.title}>{page.title}</Text>
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
                h1: {color: '#333333', fontSize: 16, margin: 0, padding: 0},
                h2: {color: '#333333', fontSize: 16, margin: 0, padding: 0},
                h3: {color: '#333333', fontSize: 16, margin: 0, padding: 0},
              }}
              contentWidth={width}
              source={{html: page.content}}
              enableExperimentalMarginCollapsing={true}
              enableExperimentalGhostLinesPrevention={true}
            />
            <View style={styles.dividerTwo}></View>
            <View style={styles.updatedContainer}>
              <MaterialIcons
                name="today"
                style={styles.updatedIcon}
                size={18}
              />
              <Text style={styles.updatedText}>
                Terakhir Update : {moment(page.updated_at).format('LL')}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.marginToBottom}></View>
      </ScrollView>
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

  divider: {
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    marginBottom: 10,
  },

  dividerTwo: {
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },

  updatedContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingRight: 13,
  },

  updatedIcon: {
    marginRight: 5,
    color: '#333333',
  },

  updatedText: {
    fontSize: 13,
    color: '#333333',
  },

  marginToBottom: {
    marginBottom: 20,
  },
});
