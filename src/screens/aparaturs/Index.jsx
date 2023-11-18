import {View, SafeAreaView, ScrollView, FlatList} from 'react-native';

import React, {useState, useEffect} from 'react';

//import api services
import Api from '../../services/Api';

//import component loading
import Loading from '../../components/Loading';

//import component list aparatur
import ListAparatur from '../../components/ListAparatur';

export default function AparatursScreen() {
  //init state
  const [aparaturs, setAparaturs] = useState([]);
  const [loadingAparaturs, setLoadingAparaturs] = useState(true);

  //method fetchDataAparaturs
  const fetchDataAparaturs = async () => {
    //set loading true
    setLoadingAparaturs(true);

    await Api.get('/api/public/aparaturs').then(response => {
      //assign data to state
      setAparaturs(response.data.data);

      //set loading false
      setLoadingAparaturs(false);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataAparaturs"
    fetchDataAparaturs();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={{padding: 15}}>
        <View>
          {loadingAparaturs ? (
            <Loading />
          ) : (
            <>
              <FlatList
                style={{marginTop: 10, marginBottom: 20}}
                numColumns={2}
                data={aparaturs}
                renderItem={({item, index, separators}) => (
                  <ListAparatur data={item} index={index} />
                )}
                eyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
