import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import React from 'react';

export default function ListPhoto({data}) {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: data.image,
        }}
      />
      <Text style={styles.caption}>{data.caption}</Text>
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
    height: 110,
    borderRadius: 5,
  },

  caption: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 7,
    fontSize: 12,
    color: '#696969',
  },
});
