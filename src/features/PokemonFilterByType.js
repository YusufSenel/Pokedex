import { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';

export default function PokemonFilterByType({pokemons}) {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);


  useEffect(() => {
    fetch('https://pokebuildapi.fr/api/v1/types')
      .then((response) => response.json())
      .then((data) => setTypes(data));
  }, []);

  return (
    <View>
        <FlatList
          data={types}
          keyExtractor={(item) => item.name}
          numColumns={8}
          renderItem={({ item }) => (
            <TouchableOpacity 
                onPress={() => setSelectedType(item.name)}>
              <Image source={{ uri: item.image }} style={styles.image}/>
              <Text> {item.name} </Text>
            </TouchableOpacity>
          )}
        />
    </View>
  );
  
};

const styles = StyleSheet.create({

  image: {
    width: 30,
    height: 30,
    marginRight: 15,
  },

});

