import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import React from 'react';

//import useNavigation
import {useNavigation} from '@react-navigation/native';

export default function ListPage({data}) {
  //ini navigation
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PageShow', {
          slug: data.slug,
        })
      }
      style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    marginRight: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderRadius: 10,
    padding: 15,
  },

  title: {
    fontSize: 14,
    color: '#696969',
    textAlign: 'center',
  },
});
