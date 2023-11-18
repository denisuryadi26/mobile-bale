import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import React from 'react';

//import useNavigation
import {useNavigation} from '@react-navigation/native';

export default function ListAparatur({data}) {
  //ini navigation
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {}} style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: data.image,
        }}
      />
      <View style={styles.divider}></View>
      <Text style={styles.aparaturName}>{data.name}</Text>
      <Text style={styles.aparaturRole}>{data.role}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: 190,
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
    padding: 10,
  },

  image: {
    width: '100%',
    height: 160,
    borderRadius: 5,
  },

  divider: {
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    marginTop: 10,
  },

  aparaturName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 13,
    color: '#696969',
  },

  aparaturRole: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 2,
    fontSize: 12,
    color: '#696969',
  },
});
